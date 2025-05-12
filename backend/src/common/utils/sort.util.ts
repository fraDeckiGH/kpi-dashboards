import { getNestedValue } from "src/common/utils"
import { UnprocessableEntityException } from "@nestjs/common"

export {
  nullsPositionTypes,
  sortOrderTypes,
  sortByField,
}
export type {
  SortOrder,
  SortOptions,
  NullsPosition,
}


const nullsPositionTypes = [
  `first`, 
  `last`, 
] as const
type NullsPosition = typeof nullsPositionTypes[number]
const sortOrderTypes = [
  `asc`, 
  `desc`, 
] as const
type SortOrder = typeof sortOrderTypes[number]

interface SortOptions<T> {
  // field: T
  // field: keyof T
  // field: string // supports nested paths, eg 'nested.field'
  field: PropertyKey // supports nested paths, eg 'nested.field'
  
  /** where to place nullish values */
  nulls?: NullsPosition
  /** order */
  order: SortOrder
}

/** supports nested paths, eg 'nested.field' */
// function sortByField<T, SortT extends keyof T>(items: T[], sort: SortOptions<SortT>)/* : T[] */ {
// function sortByField<T extends PropertyKey, SortT extends PropertyKey = /* keyof  */T>(items: T[], sort: SortOptions<SortT>)/* : T[] */ {
function sortByField<T, SortT extends PropertyKey = keyof T>(items: T[], sort: SortOptions<SortT>)/* : T[] */ {
  const { field, order, nulls } = sort

  items.sort((a, b) => {
    const valA = getNestedValue(a, field)
    const valB = getNestedValue(b, field)

    // * check for non-sortable types
    let nonSortableMsg = `field 'Symbol()' is an object/array and cannot be sorted directly`
    if (typeof field !== "symbol") {
      // field is string || number
      nonSortableMsg = `field '${String(field)}' is an object/array and cannot be sorted directly`
    }
    
    if (
      !(valA instanceof Date) &&
      ((valA !== null && typeof valA === 'object') || Array.isArray(valA))
    ) {
      throw new UnprocessableEntityException(nonSortableMsg)
    }
    if (
      !(valB instanceof Date) &&
      ((valB !== null && typeof valB === 'object') || Array.isArray(valB))
    ) {
      throw new UnprocessableEntityException(nonSortableMsg)
    }

    // * handle nullish values
    const nullishComparison = handleNullishValues(valA, valB, order, nulls)
    if (nullishComparison !== null) {
      return nullishComparison
    }
    
    // if we reach here: both valA and valB are non-null and sortable
    let comparison = compareValues(valA, valB)

    return order === 'desc' ? comparison * -1 : comparison
  })

  return items
}


/** handles: boolean, Date */
function compareValues(a: any, b: any)/* : number */ {
  // * for Date
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() - b.getTime()
  }
  // * for boolean: true > false
  if (typeof a === 'boolean' && typeof b === 'boolean') {
    return a === b ? 0 : a ? 1 : -1
  }
  if (a > b) {
    return 1
  }
  if (a < b) {
    return -1
  }
  return 0
}

function handleNullishValues(
  valA: any, 
  valB: any, 
  order: SortOrder, 
  nulls?: NullsPosition
)/* : number | null */ {
  const aExists = valA !== undefined && valA !== null
  const bExists = valB !== undefined && valB !== null

  if (!aExists && !bExists) {
    return 0
  }

  // default behavior: nulls last for asc, nulls first for desc
  let defaultNullsLastAsc = 1 
  let defaultNullsFirstDesc = -1

  if (nulls === 'first') {
    defaultNullsLastAsc = -1 // if nulls first, non-null is greater
    defaultNullsFirstDesc = -1 // if nulls first, null is smaller
  } else if (nulls === 'last') {
    defaultNullsLastAsc = 1 // if nulls last, non-null is smaller
    defaultNullsFirstDesc = 1 // if nulls last, null is greater
  }

  if (!aExists) {
    return order === 'desc' ? defaultNullsFirstDesc : defaultNullsLastAsc
  }
  if (!bExists) {
    return order === 'desc' ? -defaultNullsFirstDesc : -defaultNullsLastAsc
  }
  
  return null // both values exist, proceed to normal comparison
}
