import { create } from 'zustand'
import { createSelectors } from '@/lib/zustand'
import { Kpi, kpis } from '@/lib/db'
import { Visual } from '@/lib/db/types'

export const useKpisStore = createSelectors(
  create<{
    kpis: typeof kpis
    set_kpi_selectedVisual: (id: Kpi["id"], visual: Visual) => void
  }>()((set) => ({
    kpis, 
    set_kpi_selectedVisual: (id, visual) => set((state) => ({ 
      kpis: {
        ...state.kpis, 
        [id]: {
          ...state.kpis[id], 
          selectedVisual: visual, 
        }, 
      }, 
    })), 
  }))
)
