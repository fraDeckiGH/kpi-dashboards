import { IntersectionType } from "@nestjs/mapped-types"
import { AssetBase, Visual } from "src/common/db"

export {
  Kpi,
}
export type {
  Kpis,
  KpiInquiry,
}

class KpiBase {
  /** aka: business questions
    Specific inquiries or strategic questions that the KPI aims to answer */
  addressedQuestions: KpiInquiry[]
  /** answer the question: is this KPI useful for evaluating the performance/contribution of individual affiliates within a business network? */
  affiliatesApplicability: boolean
  calculationFormula: string
  desc: string
  /** a set of more granular metrics to measure and track the KPI */
  metrics: string[]
  // visual
  /** default/select visual that best communicates this KPI's insights */
  recommendedVisual: Visual
  /** user selected visual that best communicates this KPI's insights */
  selectedVisual: Visual
  /** all available */
  visualsAvailable: Visual[]
}
class Kpi extends IntersectionType(
  AssetBase,
  KpiBase,
) {}

type Kpis = Record<Kpi["id"], Kpi>

/** aka: business question */
type KpiInquiry = {
  // id: string
  question: string
  /** short explanation */
  explShort: string
}
