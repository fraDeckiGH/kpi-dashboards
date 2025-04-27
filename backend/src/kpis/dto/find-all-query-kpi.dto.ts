import { IntersectionType, PartialType } from '@nestjs/mapped-types'
import { Type } from 'class-transformer'
import { IsInt, IsOptional, IsString, Min, Max, IsArray, ValidateNested } from 'class-validator'
import { Kpi } from 'src/common/db'
import { Sort, SortWrap } from 'src/common/dto'

export {
  FindAllQueryKpiDto,
}

class FindAllQueryKpiDtoBase {
  /** props to filter(included), exclude the others */
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filter?: (Exclude<keyof Kpi, 'id'>)[]

  @IsInt()
  @Min(1)
  @Max(50)
  limit: number = 10

  @IsInt()
  @Min(0)
  skip: number = 0

  // @ValidateNested()
  // @Type(() => Sort<Kpi>)
  // sort?: Sort<Kpi>
}

class FindAllQueryKpiDto extends IntersectionType(
  FindAllQueryKpiDtoBase,
  PartialType(SortWrap<Kpi>),
) {}
