
// why? bc shadcn initially generated its utils here
export * from "@/lib/utils/shadcn"

export {
  flattenToSearchParams,
}


function flattenToSearchParams(
  obj: Record<string, any> = {}, 
  prefix = '', 
  params = new URLSearchParams(), 
) {
  for (const [key, value] of Object.entries(obj)) {
    const paramKey = prefix ? `${prefix}[${key}]` : key
    
    if (value !== null && typeof value === 'object') {
      // recurse into nested objects/arrays
      flattenToSearchParams(value, paramKey, params)
    } else {
      params.append(paramKey, String(value))
    }
  }
  
  return params
}



