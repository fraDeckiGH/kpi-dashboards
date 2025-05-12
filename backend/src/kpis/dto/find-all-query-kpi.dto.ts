import { DefaultValuePipe } from '@nestjs/common'
import { IntersectionType, PartialType } from '@nestjs/mapped-types'
import { Type } from 'class-transformer'
import { IsInt, IsOptional, IsString, Min, Max, IsArray, ValidateNested } from 'class-validator'
import { Kpi as Entity } from 'src/common/db'
import { Sort, SortWrap } from 'src/common/dto'

export {
  FindAllQueryDto as FindAllQueryKpiDto,
  SortT as FindAllQueryKpiDto_SortT,
}


class FindAllQueryDtoBase {
  /** props to filter(included), exclude the others */
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  filter?: Filter[]

  // @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  limit: number = 10

  // @IsOptional()
  @IsInt()
  @Min(0)
  skip: number = 0

  // @IsOptional()
  // @ValidateNested()
  // @Type(() => Sort<Entity>)
  // sort?: Sort<Entity>
}

class FindAllQueryDto extends IntersectionType(
  FindAllQueryDtoBase,
  
  // @IsOptional() // ? do this? if so, how?
  PartialType(SortWrap<SortT>),
) {}


// * {↑} misc
type Filter = 
  | Exclude<keyof Entity, 'id'>
  | AddressedQuestions_NestedKeys
  | Sentiment_NestedKeys
;

// * nested keys
type AddressedQuestions_NestedKeys = `addressedQuestions.${keyof Entity['addressedQuestions'][number]}`
type Sentiment_NestedKeys = `sentiment.${keyof Entity['sentiment']}`

// * sort
type SortT =
  | SortableKeys
  // | AddressedQuestions_NestedKeys // cant sort nested keys
  | Sentiment_NestedKeys
;
type SortableKeys = Exclude<keyof Entity, 
  | 'metrics' 
  | 'visualsAvailable' 
  | 'status' 
  | 'sentiment' 
  | 'addressedQuestions'
>
  



