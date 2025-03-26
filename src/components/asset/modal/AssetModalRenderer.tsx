'use client'

import { Asset } from '@/lib/db/types'
import LayoutModal from '@/lib/layout/modals/LayoutModal'
import KpiModal from '@/lib/kpi/modals/KpiModal'
import StoryboardModal from '@/lib/storyboard/modals/StoryboardModal'
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
