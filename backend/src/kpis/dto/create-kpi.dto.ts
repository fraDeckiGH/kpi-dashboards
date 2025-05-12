import { OmitType } from "@nestjs/mapped-types"
import { KpiAsset } from "src/common/db"

export {
  CreateKpiDto, 
}

class CreateKpiDto extends OmitType(KpiAsset, [
  `id`, 
  `selectedVisual`, 
] as const) {}
