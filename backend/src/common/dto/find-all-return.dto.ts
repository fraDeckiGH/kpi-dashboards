import { IsInt, Min } from "class-validator"

export {
  FindAllReturnDto,
}

class FindAllReturnDto {
  /** total No. of records in db */
  @IsInt()
  dataTotalLength: number
  @IsInt()
  @Min(1)
  pageCurrent: number
  /** total No. of pages */
  @IsInt()
  pagesLength: number
}
