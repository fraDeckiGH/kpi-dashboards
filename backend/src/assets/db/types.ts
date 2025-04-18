import { Kpi, Layout, Storyboard } from "src/common/db"

// * misc types

export type {
  Asset, 
  AssetBase, 
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





