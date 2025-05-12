import { IntersectionType } from "@nestjs/mapped-types"
import {
	IsArray,
	IsBoolean,
	IsIn,
	IsString,
	ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'
import { 
  // AssetBase, // ? FIX circular dep: direct import
  // StatusWrap, // ? FIX circular dep: direct import
  Visual, 
  visualTypes, 
} from "src/common/db"
import { AssetBase } from "src/assets/entities/asset.entity"
import { StatusWrap } from "src/status/entities/status.entity"

export {
  Kpi,
  Kpis,
  KpiAsset,
  // KpiInquiry,
}
export type {
  // Kpis,
}

class KpiBase {
  /** aka: business questions
    Specific inquiries or strategic questions that the KPI aims to answer */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => KpiInquiry)
  addressedQuestions: KpiInquiry[]
  /** answer the question: is this KPI useful for evaluating the performance/contribution of individual affiliates within a business network? */
  @IsBoolean()
  affiliatesApplicability: boolean
  @IsString()
  calculationFormula: string
  @IsString()
  desc: string
  /** a set of more granular metrics to measure and track the KPI */
  @IsArray()
  @IsString({ each: true })
  metrics: string[]
  // visual
  /** default/select visual that best communicates this KPI's insights */
  @IsIn(visualTypes)
  recommendedVisual: Visual
  /** user selected visual that best communicates this KPI's insights */
  @IsIn(visualTypes)
  selectedVisual: Visual
  /** all available */
  @IsArray()
  @IsIn(visualTypes, { each: true })
  visualsAvailable: Visual[]
}

class KpiAsset extends IntersectionType(
  AssetBase,
  KpiBase,
) {}
class Kpi extends IntersectionType(
  KpiAsset,
  StatusWrap,
) {}

type Kpis = Record<Kpi["id"], Kpi>

/** aka: business question */
// type KpiInquiry = {
class KpiInquiry {
  // id: string
  @IsString()
  question: string
  /** short explanation */
  @IsString()
  explShort: string
}
