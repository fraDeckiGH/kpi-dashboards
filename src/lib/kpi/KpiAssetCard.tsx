import React, { useState } from 'react'
import { getIcon } from '@/lib/visual/Visual'
import { Kpi } from '@/lib/db'
import MiniVisual from '@/lib/visual/MiniVisual'

interface Props {
  asset: Kpi
  cardLike: boolean
  selected: boolean
  setSelected: (id: string, value: boolean) => void
  slotStart?: React.ReactNode
}

export default function KpiAssetCard({ asset, cardLike, selected, setSelected, slotStart }: Props) {
  // const set_kpi_selectedVisual = useKpisStore.use.set_kpi_selectedVisual()
  const [ selectedVisual, setSelectedVisual ] = useState(asset.selectedVisual)
  
  return (<>
    <div 
      className={`rounded-lg py-2 px-4 
        ${cardLike ? `bg-white shadow-sm border border-gray-100` : ``} 
        ${selected ? `bg-slate-100` : ``} 
        flex flex-col gap-2
        relative
      `}
    >
      <div className="absolute top-0 left-0 h-full w-full -z-0
          rounded-lg cursor-pointer
        "
        onClick={() => setSelected(asset.id, !selected)}
        role="button"
      ></div>
      
      <div className="flex items-center gap-4">
        {slotStart}
        
        <div className="rounded-md p-2.5
          bg-gray-100 text-gray-400
          flex items-center justify-center
        ">
          {getIcon(/* asset. */selectedVisual, 28)}
        </div>
        
        <div className="flex-1 flex flex-col gap-2 flex-wrap">
          <h4 className="font-medium text-gray-900 ">
            {asset.name}
          </h4>
          
          <div className="flex flex-wrap gap-2 z-auto">
            {asset.visualsAvailable.map((visual) => (
              <MiniVisual 
                key={visual}
                onSelect={() => {
                  setSelectedVisual(visual)
                  // set_kpi_selectedVisual(asset.id, visual)
                }}
                recommended={visual === asset.recommendedVisual}
                selected={visual === /* asset. */selectedVisual}
                visual={visual}
              ></MiniVisual>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  </>);
}
