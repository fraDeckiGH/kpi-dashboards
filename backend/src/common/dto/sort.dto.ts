import { Type } from 'class-transformer'
import { IsIn, IsOptional, IsString, ValidateNested } from 'class-validator'
import { NullsPosition, nullsPositionTypes, SortOrder, sortOrderTypes } from 'src/common/utils'

export {
  Sort,
  SortWrap,
}

class Sort<T> {
  @IsString()
  // field: keyof T
  field: T // supports nested paths, eg 'nested.field'
  // field: PropertyKey // supports nested paths, eg 'nested.field'

  @IsOptional()
  @IsIn(nullsPositionTypes)
  nulls?: NullsPosition
  
  // @IsOptional()
  @IsIn(sortOrderTypes)
  order: SortOrder = 'asc'
}

class SortWrap<T> {
  // @IsOptional()
  @ValidateNested()
  @Type(() => Sort<T>)
  sort: Sort<T>
}