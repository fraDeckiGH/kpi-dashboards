import React from 'react'
import AssetCard from '@/components/asset/AssetCard'
import AssetGrid from '@/components/asset/AssetGrid'
import { getIcon } from '@/components/visual/Visual'
import { useKpisStore } from '@/lib/kpi/db/store-kpi'

export default function KpiSection() {
  const kpis = useKpisStore.use.kpis()
  const assets = Object.values(kpis)
  
  return (<>
    <AssetGrid
      title="KPI"
      description="Key Performance Indicators available for your area"
    >
      {assets.map((asset) => (
        <AssetCard 
          key={asset.id} 
          asset={asset}
          icon={getIcon(asset.selectedVisual, 60)}
        ></AssetCard>
      ))}
    </AssetGrid>
  </>);
}
