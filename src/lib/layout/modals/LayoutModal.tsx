import React from 'react'
import { Grid3x3Icon } from 'lucide-react'
import AssetModal from '@/components/asset/modal/AssetModal'
import { useAssetModalRendererStore } from '@/components/asset/modal/AssetModalRenderer'
import { KpiInquiry, Layout } from '@/lib/db'
import { useKpisStore } from '@/lib/kpi/db/store-kpi'

export default function LayoutModal() {
  const asset = useAssetModalRendererStore.use.asset() as Layout
  const kpis = useKpisStore.use.kpis()
  const icon = (
    <div className="
      mb-3 p-3 rounded-md
      bg-gray-100 text-gray-500 
    ">
      <Grid3x3Icon size={32} />
    </div>
  )
  
  const businessQuestions = (() => {
    let ret: KpiInquiry[] = []
    asset.kpisUsed.forEach((id) => {
      ret.push(...kpis[id].addressedQuestions)
    })
    return ret
  })();
  
  return (
    <AssetModal 
      icon={icon}
    >
      <section className="px-5  flex flex-col gap-4">
        {/* description */}
        <p className="text-center">
          {asset.desc}
        </p>
        
        <div className="flex flex-wrap gap-2 justify-center">
          {asset.kpisUsed.map((val, index) => (
            <span key={index} className="
              px-2 py-1 
              bg-gray-100 text-gray-600 
              text-xs rounded-md
              border border-gray-300 
            ">
              #{val}
            </span>
          ))}
        </div>
        
        <div className="mt-3  grid grid-cols-4">
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">{asset.usageCount}</span>
            <span className="text-xs text-gray-500">Used</span>
          </div>
          {/* TODO understand: what does this represent? */}
          <div className="flex flex-col items-center border-l">
            <span className="font-bold text-lg">Universal</span>
            <span className="text-xs text-gray-500">Type</span>
          </div>
          <div className="flex flex-col items-center border-l">
            <span className="font-bold text-lg">{asset.pagesNo}</span>
            <span className="text-xs text-gray-500">Page No.</span>
          </div>
          <div className="flex flex-col items-center border-l">
            <span className="font-bold text-lg">{asset.lastUpdate}</span>
            <span className="text-xs text-gray-500">Last Updated</span>
          </div>
        </div>
      </section>

      <section className="">
        {/* <h3 className="text-lg font-semibold mb-2">Preview</h3> */}
        
        <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="w-full max-w-md h-64 
            bg-white rounded border border-gray-200 
            flex items-center justify-center
            invisible
          ">
            <svg width="200" height="120" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="10" width="180" height="30" rx="2" fill="#E5E7EB"/>
              <rect x="10" y="50" width="85" height="60" rx="2" fill="#E5E7EB"/>
              <rect x="105" y="50" width="85" height="60" rx="2" fill="#E5E7EB"/>
            </svg>
          </div>
        </div>
      </section>
      
      <section className="">
        <h3 className="text-lg font-semibold mb-2">Business Questions</h3>
        
        <div className="grid grid-cols-2 ">
          {businessQuestions.map((item, index) => (
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