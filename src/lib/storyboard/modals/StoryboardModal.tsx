import React from 'react'
import { Button } from '@/components/ui/button'
import AssetModal from '@/lib/asset/modals/AssetModal'
import { PackagePlusIcon, PresentationIcon } from 'lucide-react'
import { useAssetModalRendererStore } from '@/lib/asset/modals/AssetModalRenderer'
import { Storyboard } from '@/lib/db'
import { affiliates } from '@/lib/affiliate/db/mock-affiliate'
import { useKpisStore } from '@/lib/kpi/db/store-kpi'
import { useRequestModalStore } from '@/lib/request/RequestModal'

export default function StoryboardModal() {
  const asset = useAssetModalRendererStore.use.asset() as Storyboard
  const kpis = useKpisStore.use.kpis()
  // request modal
  const setArea_requestModal = useRequestModalStore.use.setArea()
  const open_requestModal = useRequestModalStore.use.open()
  
  const icon = (
    <div className="
      mb-3 p-3 rounded-md
      bg-orange-100 text-orange-500 
    ">
      <PresentationIcon size={32} />
    </div>
  )
  
  const affiliateNames = asset.applicableAffiliates.map((id) => {
    const affiliate = affiliates.find((affiliate) => affiliate.id === id)
    return affiliate!.name
  });
  const kpisApplied = asset.kpisApplied.map((id) => kpis[id]);
  
  return (
    <AssetModal 
      icon={icon}
    >
      <section className="">
        <h3 className="text-lg font-semibold mb-3">Coupled KPIs/Filters</h3>
        
        <div className="grid grid-cols-2 gap-3">
          {kpisApplied.map((item, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-800">{item.name}</h4>
              <p className="text-sm text-gray-600">{item.descShort}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="">
        <h3 className="text-lg font-semibold mb-3">Applicable Affiliates</h3>
        
        <div className="flex flex-col items-start gap-2">
          {affiliateNames.map((name, index) => (
            <div key={index} className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full">
              {name}
            </div>
          ))}
        </div>
      </section>

      {/* <section className="">
        <h3 className="text-lg font-semibold mb-3">Preview</h3>
        
        <div className="p-4 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="w-full max-w-md h-64 
            bg-white rounded border border-gray-200 
            flex items-center justify-center
          ">
            <svg width="200" height="120" viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="10" width="180" height="20" rx="2" fill="#E5E7EB"/>
              <rect x="10" y="40" width="180" height="10" rx="2" fill="#E5E7EB"/>
              <rect x="10" y="60" width="180" height="10" rx="2" fill="#E5E7EB"/>
              <rect x="10" y="80" width="180" height="10" rx="2" fill="#E5E7EB"/>
              <rect x="10" y="100" width="100" height="10" rx="2" fill="#E5E7EB"/>
            </svg>
          </div>
        </div>
      </section> */}

      <section className="mt-3 -mb-2">
        <Button className="w-full bg-slate-500" variant="default"
          onClick={() => {
            open_requestModal("Storyboards")
          }}
        >
          <PackagePlusIcon />
          Request
        </Button>
      </section>
    </AssetModal>
  );
}