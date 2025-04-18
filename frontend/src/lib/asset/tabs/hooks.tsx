import { useKpisStore } from '@/lib/kpi/db/store-kpi'
import { useFindAllKpis } from '@/lib/kpi/api/findAll'
import { useEffect } from 'react'

export function useKpis() {
  const setKpis = useKpisStore.use.setKpis()
  const { 
    data: kpis, 
    status: kpisStatus, 
  } = useFindAllKpis()
  
  useEffect(() => {
    switch (kpisStatus) {
      case "success": {
        if (kpis) {
          setKpis(kpis)
        }
        break
      }
    }
    
    // cleanup
    return () => {
      setKpis() 
    }
  }, [ kpis ])
}
