import { api_baseUrl } from "@/lib/api/api"
import { Kpi, Kpis } from "@/lib/db"
import { flattenToSearchParams } from "@/lib/utils"
import { keepPreviousData, QueryFunctionContext, useQuery } from "@tanstack/react-query"

/** backend: FindAllQueryKpiDto */
type Filter = Partial<{
  filter: (Exclude<keyof Kpi, 'id'>)[]
  limit: number
  skip: number
  sort: {
    field: keyof Kpi
    direction: 'asc' | 'desc'
  }
}>
type QueryKey = [ string, Filter ]
type QueryFnArgs = QueryFunctionContext<QueryKey>
type QueryFnReturn = {
  data: Kpis
  // properties from FindAllReturnDto (backend)
  dataLength: number
  pageCurrent: number
  pagesLength: number
}

async function queryFn({ 
  queryKey, 
}: QueryFnArgs) {
  const [ , filter ] = queryKey
  
  const url = new URL(`/kpis`, api_baseUrl)
  const params = flattenToSearchParams(filter)
  url.search = params.toString()
  
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Network response was not ok`)
  }
  
  const ret: QueryFnReturn = await response.json()
  return ret
}

export function useFindAllKpis(filter?: Filter) {
  return (
    useQuery<QueryFnReturn>({
      queryKey: [ "kpis", filter ],
      
      // queryFn: queryFn as any,
      queryFn: ({ queryKey, }) => queryFn({ queryKey, } as QueryFnArgs), 
      
      // https://tanstack.com/query/latest/docs/framework/react/guides/paginated-queries#better-paginated-queries-with-placeholderdata
      placeholderData: keepPreviousData,
      retry: 0,
      // staleTime: 1000 * 60 * 5, // 5min
    })
  );
}
