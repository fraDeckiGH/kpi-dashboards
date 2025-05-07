import { IsInt, Min } from "class-validator"

export {
  FindAllReturnDto,
}

class FindAllReturnDto {
  @IsInt()
  dataLength: number
  @IsInt()
  @Min(0)
  pageCurrent: number
  @IsInt()
  pagesLength: number
}
