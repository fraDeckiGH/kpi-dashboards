import { useKpisStore } from '@/lib/kpi/db/store-kpi'
import { useFindAllKpis } from '@/lib/kpi/queries/findAll'
import { useEffect } from 'react'

export function useKpis() {
  const setKpis = useKpisStore.use.setKpis()
  const { 
    data, 
    status, 
  } = useFindAllKpis({
    limit: 20, 
  })
  
  useEffect(() => {
    switch (status) {
      case "success": {
        if (data) {
          setKpis(data.data)
        }
        break
      }
    }
    
    // cleanup
    return () => {
      setKpis() 
    }
  }, [ data ])
}
