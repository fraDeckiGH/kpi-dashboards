import { create } from 'zustand'
import { createSelectors } from '@/lib/utils/zustand'
import { Kpi, Kpis } from '@/lib/db'
import { Visual } from '@/lib/db'

const initVal = {}

export const useKpisStore = createSelectors(
  create<{
    kpis: Kpis
    setKpis: (value?: Kpis/*  | undefined */) => void
    
    set_kpi_selectedVisual: (id: Kpi["id"], visual: Visual) => void
  }>()((set) => ({
    kpis: initVal, 
    setKpis: (value) => set({ 
      kpis: value ?? initVal, 
    }), 
    
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
