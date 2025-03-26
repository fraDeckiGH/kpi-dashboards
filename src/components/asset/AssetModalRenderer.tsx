'use client'

import { Asset } from '@/lib/db/types'
import LayoutModal from '@/components/modals/LayoutModal'
import KpiModal from '@/components/modals/KpiModal'
import StoryboardModal from '@/components/modals/StoryboardModal'
import { create } from 'zustand'
import { createSelectors } from '@/lib/zustand'

export default function AssetModalRenderer() {
  const isModalOpen = useAssetModalRendererStore.use.isModalOpen()
  const asset = useAssetModalRendererStore.use.asset()
  
  if (!isModalOpen || !asset) return null;

  switch (asset.type) {
    case 'kpi':
      return (
        <KpiModal></KpiModal>
      );
    case 'layout':
      return (
        <LayoutModal></LayoutModal>
      );
    case 'storyboard':
      return (
        <StoryboardModal></StoryboardModal>
      );
  }
}


type AssetT = Asset

export const useAssetModalRendererStore = createSelectors(
  create<{
    asset: AssetT
    handleAssetClick: (asset: AssetT) => void
    handleCloseModal: () => void
    isModalOpen: boolean
  }>()((set) => ({
    asset: {} as AssetT, 
    handleAssetClick: (asset) => set({ 
      isModalOpen: true, 
      asset, 
    }), 
    handleCloseModal: () => set({ 
      isModalOpen: false, 
    }), 
    isModalOpen: false, 
  }))
)
