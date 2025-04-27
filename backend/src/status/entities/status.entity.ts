import { Exclude, Type } from "class-transformer"
import { IsDateString, IsIn, ValidateNested } from "class-validator"

export {
  // Status, 
  StatusWrap, 
}

const currentTypes = [
  `active`, 
  `disabled`, // deleted, disabled, inactive, removed
  `restored`, 
] as const
type Current = typeof currentTypes[number]

class Status {
  @IsIn(currentTypes)
	current: Current
  @IsDateString()
  lastUpdate: string
}

/** to be fed into IntersectionType
 * https://docs.nestjs.com/techniques/validation#mapped-types
 */
class StatusWrap {
  @Exclude()
  @ValidateNested()
  @Type(() => Status)
  status: Status
}
