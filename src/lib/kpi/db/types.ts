import { AssetBase, Visual } from "@/lib/db"

export type {
  Kpi,
  KpiInquiry,
}

/** may also be an high-level KPI, in that case may very well represent a strategic theme */
type Kpi = AssetBase & {
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
/** aka: business question */
type KpiInquiry = {
  // id: string
  question: string
  /** short explanation */
  explShort: string
}
