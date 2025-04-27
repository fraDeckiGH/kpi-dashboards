
export {
  sortDirectionTypes,
  sortByField,
}
export type {
  SortDirection,
  SortOptions,
}

const sortDirectionTypes = [
  `asc`, 
  `desc`, 
] as const
type SortDirection = 'asc' | 'desc'

interface SortOptions<T> {
  field: keyof T
  direction: SortDirection
}

function sortByField<T>(items: T[], sort: SortOptions<T>)/* : T[] */ {
  const { field, direction } = sort

  items.sort((a, b) => {
    const valA = a[field]
    const valB = b[field]

    let comparison = 0
    if (valA > valB) {
      comparison = 1
    } else if (valA < valB) {
      comparison = -1
    }

    return direction === 'desc' ? comparison * -1 : comparison
  })

  return items
}
