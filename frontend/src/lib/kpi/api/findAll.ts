import { api_baseUrl } from "@/lib/api/api"
import { Kpis } from "@/lib/db"
import { useQuery } from "@tanstack/react-query"

async function queryFn() {
  const response = await fetch(`${api_baseUrl}kpis`)
  if (!response.ok) {
    throw new Error(`Network response was not ok`)
  }

  const data = await response.json()
  const ret: Kpis = {
    ...data, 
  }
  
  return ret
}

export function useFindAllKpis() {
  return useQuery({
    queryKey: [ "kpis",  ],
    queryFn: () => queryFn(), 
    retry: 0,
    // staleTime: 1000 * 60 * 5, // 5min
  })
}
