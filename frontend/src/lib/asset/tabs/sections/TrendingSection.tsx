import React from 'react'
import AssetCard from '@/lib/asset/AssetCard'
import AssetGrid from '@/lib/asset/AssetGrid'
import { Kpi, layouts, storyboards } from '@/lib/db'
import { useKpisStore } from '@/lib/kpi/db/store-kpi'
import { getIcon } from '@/lib/visual/Visual'

export default function TrendingSection() {
  const kpis = useKpisStore.use.kpis()
  const assets = [ 
    ...Object.values(kpis), 
    ...layouts, 
    ...storyboards, 
  ].filter((val) => val.sentiment.trending)
  
  return (<>
    <AssetGrid
      title="Trending"
      description="Most popular by community"
    >
      {assets.map((asset) => {
        const assetTmp = asset as Kpi
        return (
          <AssetCard 
            key={asset.id} 
            asset={asset} 
            cardLike={false} 
            icon={assetTmp.selectedVisual && getIcon(assetTmp.selectedVisual, 60)}
          />
        );
      })}
    </AssetGrid>
  </>);
}
