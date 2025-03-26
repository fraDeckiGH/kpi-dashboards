import React, { useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import AssetGrid from '@/components/asset/AssetGrid'
import { layouts, storyboards } from '@/lib/db'
import AssetCard from '@/components/asset/AssetCard'
import FeaturedSection from '@/components/tab-sections/FeaturedSection'
import KpiSection from '@/components/tab-sections/KpiSection'
import TrendingSection from '@/components/tab-sections/TrendingSection'
import AssetModalRenderer from '@/components/asset/AssetModalRenderer'
import { useRequestModalStore } from '@/components/modals/RequestModal'

const tabs = [ 'Featured', 'KPI', 'Layouts', 'Storyboards' ] as const
type TabT = (typeof tabs[number])

export default function AssetTabs() {
  const setArea_requestModal = useRequestModalStore.use.setArea()
  
  useEffect(() => {
    setArea_requestModal(tabs[0])
  }, [])
  
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
