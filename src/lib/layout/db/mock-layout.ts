import { Kpi } from "@/lib/db"
import { AssetBase, Visual } from "@/lib/db/types"

export {
  layouts, 
}
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

const layouts: Layout[] = [
  {
    id: `layout-1`,
    name: `Executive Dashboard Overview`,
    descShort: `High-level KPIs for executive review`,
    lastUpdate: `03/24/2025`,
    sentiment: { favorite: true, trending: false, featured: false },
    type: `layout`,
    desc: `A comprehensive dashboard displaying key performance indicators across all major business units for executive leadership.`,
    kpisUsed: [`sales-growth-yoy-eu`, `software-mrr`, `overall-csat-score`, `hardware-defects-rate`],
    pagesNo: 1,
    usageCount: 55,
    visual: `bar-chart`,
  },
  {
    id: `layout-2`,
    name: `European Sales Performance`,
    descShort: `Detailed view of sales KPIs in Europe`,
    lastUpdate: `03/23/2025`,
    sentiment: { favorite: true, trending: false, featured: false },
    type: `layout`,
    desc: `A detailed layout focusing on the sales performance of GlobalTech Europe Ltd., including growth, new customer acquisition, and churn.`,
    kpisUsed: [`sales-growth-yoy-eu`, `customer-acquisition-na`, `churn-rate-apac`],
    pagesNo: 2,
    usageCount: 32,
    visual: `line-chart`,
  },
  {
    id: `layout-3`,
    name: `Software Solutions Revenue Trends`,
    descShort: `Analysis of revenue for the software division`,
    lastUpdate: `03/24/2025`,
    sentiment: { favorite: false, trending: false, featured: false },
    type: `layout`,
    desc: `A layout dedicated to analyzing the revenue trends for GlobalTech Software Solutions, focusing on MRR and customer growth.`,
    kpisUsed: [`software-mrr`, `customer-acquisition-na`],
    pagesNo: 1,
    usageCount: 18,
    visual: `line-chart`,
  },
  {
    id: `layout-4`,
    name: `Hardware Quality Report`,
    descShort: `Report on hardware production quality metrics`,
    lastUpdate: `03/22/2025`,
    sentiment: { favorite: false, trending: false, featured: false },
    type: `layout`,
    desc: `A report detailing the quality metrics for hardware manufacturing, including defect rates and production volumes.`,
    kpisUsed: [`hardware-defects-rate`],
    pagesNo: 177,
    usageCount: 300,
    visual: `table`,
  },
  {
    id: `layout-5`,
    name: `INTES`,
    descShort: `Descriptive name of the Layout`,
    lastUpdate: `07/23/2024`,
    sentiment: { favorite: false, trending: true, featured: true },
    type: `layout`,
    desc: `Those options are already baked in with this model shoot me an email clear blue water but we need distributors to evangelize the new line to local markets.`,
    kpisUsed: [`innovatesoft-social-engagement`],
    pagesNo: 6,
    usageCount: 2845,
    visual: `table`,
  },
]
