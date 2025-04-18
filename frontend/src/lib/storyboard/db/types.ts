import { AssetBase, Affiliate, Kpi } from "@/lib/db"

export type {
  Storyboard,
}

type Storyboard = AssetBase & {
  /** which subsidiaries the data and visualizations in the storyboard pertain to */
  applicableAffiliates: (Affiliate["id"])[]
  // filtersApplied: (Filter["id"])[] // unsure: too little info
  kpisApplied: (Kpi["id"])[]
}
