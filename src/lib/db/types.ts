import { Kpi, Layout, Storyboard } from "@/lib/db"

// * misc types

export type {
  Asset, 
  AssetBase, 
  Visual, 
}

type Asset = 
  | Kpi
  | Layout
  | Storyboard
;

type AssetBase = {
  id: string
  name: string
  descShort: string
  lastUpdate: string
  sentiment: Sentiment
  type: `kpi` | `layout` | `storyboard`
}

type Sentiment = {
  favorite: boolean
  featured: boolean
  trending: boolean
}

type Visual = 
  | `bar-chart` 
  | `gauge` 
  | `line-chart` 
  | `pie-chart` 
  | `table`
;





