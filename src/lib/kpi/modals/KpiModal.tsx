import React, { useState } from 'react'
import AssetModal from '@/lib/asset/modal/AssetModal'
import { useAssetModalRendererStore } from '@/lib/asset/modal/AssetModalRenderer'
import { 
  CheckIcon, 
  XIcon, 
  PlusSquareIcon,
  DatabaseIcon, 
} from 'lucide-react'
import { Kpi } from '@/lib/db'
import Visual from '@/lib/visual/Visual'
import { useKpisStore } from '@/lib/kpi/db/store-kpi'

export default function KpiModal() {
  const asset = useAssetModalRendererStore.use.asset() as Kpi
  const set_kpi_selectedVisual = useKpisStore.use.set_kpi_selectedVisual()
  const icon = (
    <div className="
      mb-3 p-3 rounded-md
      bg-blue-100 text-blue-500 
    ">
      <DatabaseIcon size={32} />
    </div>
  )
  
  const [ selectedVisual, setSelectedVisual ] = useState(asset.selectedVisual)
  
  return (
    <AssetModal 
      icon={icon}
    >
      <section className="px-5  flex flex-col gap-4">
        {/* description */}
        <p className="text-center">
          {asset.desc}
        </p>
      </section>

      <section className="">
        <h3 className="text-lg font-semibold mb-3">Metric IDs</h3>
        
        {/* <div className="p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">KPI-001, KPI-002, KPI-003</p>
        </div> */}
        <div className="flex flex-wrap gap-2">
          {asset.metrics.map((val, index) => (
            <span key={index} className="
              px-2 py-1 
              bg-gray-100 text-gray-600 
              text-xs rounded-md
              border border-gray-300 
            ">
              {val}
            </span>
          ))}
        </div>
      </section>

      <div className="">
        <h3 className="text-lg font-semibold mb-3">Calculation</h3>
        
        <div className="p-3 bg-gray-50 rounded-lg text-sm font-mono">
          {asset.calculationFormula}
        </div>
      </div>

      <section className="">
        <h3 className="text-lg font-semibold mb-3">Visuals Available</h3>
        
        <div className="grid grid-cols-3 gap-3">
          {asset.visualsAvailable.map((visual) => (
            <Visual 
              key={visual}
              onSelect={() => {
                setSelectedVisual(visual)
                set_kpi_selectedVisual(asset.id, visual)
              }}
              recommended={visual === asset.recommendedVisual}
              selected={visual === /* asset. */selectedVisual}
              visual={visual}
            ></Visual>
          ))}
        </div>
      </section>

      <section className="">
        <h3 className="text-lg font-semibold mb-3">Affiliate Applicability</h3>
        
        <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
          {asset.affiliatesApplicability ? (
            <span className="text-green-600 flex items-center gap-2">
              <CheckIcon size={20} />
              Applicable for evaluating affiliate performance
            </span>
          ) : (
            <span className="text-red-600 flex items-center gap-2">
              <XIcon size={20} />
              Cannot be used for affiliate evaluation
            </span>
          )}
        </div>
      </section>
      
      <section className="">
        <h3 className="text-lg font-semibold mb-2">Business Questions</h3>
        
        <div className="grid grid-cols-2 gap-2">
          {asset.addressedQuestions.map((item, index) => (
            <div key={index} className="py-2 px-3 hover:bg-gray-100 rounded-lg">
              <h4 className="font-medium text-gray-800">
                {item.question}
              </h4>
              <p className="text-sm text-gray-600">
                {item.explShort}
              </p>
            </div>
          ))}
        </div>
      </section>
    </AssetModal>
  );
}
