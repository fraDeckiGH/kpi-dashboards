import React, { useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import AssetGrid from '@/lib/asset/AssetGrid'
import { layouts, storyboards } from '@/lib/db'
import AssetCard from '@/lib/asset/AssetCard'
import FeaturedSection from '@/lib/asset/tabs/sections/FeaturedSection'
import KpiSection from '@/lib/asset/tabs/sections/KpiSection'
import TrendingSection from '@/lib/asset/tabs/sections/TrendingSection'
import AssetModalRenderer from '@/lib/asset/modals/AssetModalRenderer'
import { useRequestModalStore } from '@/lib/request/RequestModal'
import { useKpis } from '@/lib/asset/tabs/hooks'

const tabs = [ 'Featured', 'KPI', 'Layouts', 'Storyboards' ] as const
type TabT = (typeof tabs[number])

export default function AssetTabs() {
  const setArea_requestModal = useRequestModalStore.use.setArea()
  
  useEffect(() => {
    setArea_requestModal(tabs[0])
  }, [])
  
  useKpis()
  
  return (<>
    <Tabs 
      className=""
      defaultValue={tabs[0]} 
      onValueChange={(nextValue) => setArea_requestModal(nextValue as TabT)}
    >
      <TabsList 
        className="mb-8 rounded-md p-1 
          bg-gray-100
          w-full max-w-3xl mx-auto
        "
      >
        {tabs.map((tab) => (
          <TabsTrigger 
            key={tab}
            value={tab} 
            className="data-[state=active]:bg-white"
          >
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>
      
      <TabsContent value="Featured">
        <FeaturedSection></FeaturedSection>
        <div className="h-12"></div>
        <TrendingSection></TrendingSection>
      </TabsContent>
      
      <TabsContent value="KPI">
        <KpiSection></KpiSection>
      </TabsContent>
      
      <TabsContent value="Layouts">
        <AssetGrid 
          title="Layouts"
          description="Presentation dashboards"
        >
          {layouts.map((asset) => (
            <AssetCard 
              key={asset.id} 
              asset={asset}
            ></AssetCard>
          ))}
        </AssetGrid>
      </TabsContent>
      
      <TabsContent value="Storyboards">
        <AssetGrid
          title="Storyboards"
          description="Chart powerpoints"
        >
          {storyboards.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
            ></AssetCard>
          ))}
        </AssetGrid>
      </TabsContent>
    </Tabs>
    
    <AssetModalRenderer></AssetModalRenderer>
  </>);
}
