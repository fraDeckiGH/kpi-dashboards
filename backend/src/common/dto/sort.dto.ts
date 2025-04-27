import { Type } from 'class-transformer'
import { IsIn, IsOptional, IsString, ValidateNested } from 'class-validator'
import { SortDirection, sortDirectionTypes } from 'src/common/utils'

export {
  Sort,
  SortWrap,
}

class Sort<T> {
  @IsString()
  field: keyof T

  @IsOptional()
  @IsIn(sortDirectionTypes)
  direction: SortDirection = 'asc'
}

class SortWrap<T> {
  @ValidateNested()
  @Type(() => Sort<T>)
  sort: Sort<T>
}