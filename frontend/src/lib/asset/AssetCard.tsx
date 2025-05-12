import React from 'react'
import { Grid3x3Icon, PresentationIcon, DatabaseIcon } from 'lucide-react'
import { useAssetModalRendererStore } from '@/lib/asset/modals/AssetModalRenderer'
import { Asset } from '@/lib/db'
import { formatDate } from '@/lib/utils/date'

interface Props {
  asset: Asset
  cardLike?: boolean
  icon?: React.ReactNode
}

export default function AssetCard({ asset, cardLike = true, icon }: Props) {
  const handleAssetClick = useAssetModalRendererStore.use.handleAssetClick()
  
  function getAssetIcon() {
    if (icon) return icon
    
    switch (asset.type) {
      case 'layout': 
        return (
          <Grid3x3Icon size={60} />
        );
      case 'storyboard': 
        return (
          <PresentationIcon size={60} />
        );
      case 'kpi': 
        return (
          <DatabaseIcon size={60} />
        );
    }
  }
  
  return (<>
    <div 
      className={`rounded-lg p-4 
        ${cardLike ? `bg-white shadow-sm border border-gray-100` : ``} 
        flex gap-2
        relative
      `}
    >
      <div className="absolute top-0 left-0 h-full w-full -z-0
          rounded-lg cursor-pointer
        "
        onClick={() => handleAssetClick(asset)}
        role="button"
      ></div>
      
      <div className="flex items-center gap-4">
        <div className="rounded-md p-5
          bg-gray-100 text-gray-400
          flex items-center justify-center
        ">
          {getAssetIcon()}
        </div>
        
        <div className="flex-1 flex flex-col gap-1">
          <h3 className="font-medium text-gray-900">
            {asset.name}
          </h3>
          <p className="text-sm ">
            {asset.descShort}
          </p>
          <div className="text-xs text-gray-500 mt-auto">
            {formatDate(asset.lastUpdate)}
          </div>
        </div>
        
      </div>
    </div>
  </>);
}
