import { 
  IsBoolean, 
  IsDateString, 
  IsIn, 
  IsString, 
  ValidateNested, 
} from "class-validator"
import { Type } from "class-transformer"
import { 
  // Kpi, // ? FIX circular dep: direct import
  Layout, 
  Storyboard, 
} from "src/common/db"
import { Kpi } from "src/kpis/entities/kpi.entity"

// * misc types

export {
  AssetBase,
  Sentiment,
}
export type {
  // Asset, 
}

type Asset = 
  | Kpi
  | Layout
  | Storyboard
;

const assetBase_TypeTypes = [
  `kpi`,
  `layout`,
  `storyboard`,
] as const
type AssetBase_Type = typeof assetBase_TypeTypes[number]

class Sentiment {
  @IsBoolean()
  favorite: boolean
  @IsBoolean()
  featured: boolean
  @IsBoolean()
  trending: boolean
}

class AssetBase {
  @IsString()
  id: string
  @IsString()
  name: string
  @IsString()
  descShort: string
  @IsDateString()
  lastUpdate: string
  @ValidateNested()
  @Type(() => Sentiment)
  sentiment: Sentiment
  // @ValidateNested()
  // @Type(() => Status)
  // status: Status
  @IsIn(assetBase_TypeTypes)
  type: AssetBase_Type
}


