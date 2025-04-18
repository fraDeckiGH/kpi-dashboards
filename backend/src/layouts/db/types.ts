import { AssetBase, Kpi, Visual } from "src/common/db"

export type {
  Layout,
}

type Layout = AssetBase & {
  desc: string // present in the images
  /** KPIs being tracked */
  kpisUsed: (Kpi["id"])[]
  pagesNo: number
  usageCount: number
  visual: Visual
}
