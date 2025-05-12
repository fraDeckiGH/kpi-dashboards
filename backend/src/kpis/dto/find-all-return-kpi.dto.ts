import { IntersectionType } from '@nestjs/mapped-types'
import { Type } from 'class-transformer'
import { ValidateNested } from 'class-validator'
import { Kpi, Kpis } from 'src/common/db'
import { FindAllReturnDto } from 'src/common/dto'

export {
  FindAllReturnKpiDto
}

class FindAllReturnKpiDto extends IntersectionType(
  FindAllReturnDto,
) {
  @ValidateNested()
  /* `Kpi` instead of `Kpis` should allow 'class-transformer' 
    to correctly instantiate each record for serialization/validation */
  @Type(() => Kpi)
  data: Kpis
}
