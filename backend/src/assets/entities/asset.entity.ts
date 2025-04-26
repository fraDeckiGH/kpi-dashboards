import { Kpi, Layout, Storyboard } from "src/common/db"

// * misc types

export {
  AssetBase,
}
export type {
  // Asset, 
}

type Asset = 
  | Kpi
  | Layout
  | Storyboard
;

class AssetBase {
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
