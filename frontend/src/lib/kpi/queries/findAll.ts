import { api_baseUrl } from "@/lib/api/api"
import { 
  Kpi as Entity, 
  Kpis, 
} from "@/lib/db"
import { flattenToSearchParams } from "@/lib/utils"
import { keepPreviousData, QueryFunctionContext, useQuery } from "@tanstack/react-query"


// #region BE: find-all-query-kpi.dto.ts
// * {↑} misc
type Filter_filter = 
  | Exclude<keyof Entity, 'id'>
  | AddressedQuestions_NestedKeys
  | Sentiment_NestedKeys
;

// * nested keys
type AddressedQuestions_NestedKeys = `addressedQuestions.${keyof Entity['addressedQuestions'][number]}`
type Sentiment_NestedKeys = `sentiment.${keyof Entity['sentiment']}`

// * sort
type SortT =
  | SortableKeys
  // | AddressedQuestions_NestedKeys // cant sort nested keys
  | Sentiment_NestedKeys
;
type SortableKeys = Exclude<keyof Entity, 
  | 'metrics' 
  | 'visualsAvailable' 
  | 'status' 
  | 'sentiment' 
  | 'addressedQuestions'
>
// #endregion 


/** backend: FindAllQueryKpiDto */
type Filter = Partial<{
  // filter: string[]
  filter: Filter_filter[]
  
  limit: number
  skip: number
  
  sort: {
    // field: PropertyKey // supports nested paths, eg 'nested.field'
    field: SortT // supports nested paths, eg 'nested.field'
    nulls?: 'first' | 'last'
    order: 'asc' | 'desc'
  }
}>

type QueryKey = [ string, Filter ]
type QueryFnArgs = QueryFunctionContext<QueryKey>
type QueryFnReturn = {
  data: Kpis
  // properties from FindAllReturnDto (backend)
  dataTotalLength: number
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
