import { IsInt } from "class-validator"

export {
  FindAllReturnDto,
}

class FindAllReturnDto {
  @IsInt()
  dataLength: number
  @IsInt()
  pageCurrent: number
  @IsInt()
  pagesLength: number
}
