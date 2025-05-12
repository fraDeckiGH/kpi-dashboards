
export {
  getNestedValue,
}

/** access object's nested properties (eg 'nested.field') */
function getNestedValue(obj: any, path: PropertyKey)/* : any */ {
  if (obj === null || obj === undefined) {
    return undefined
  }

  if (typeof path === 'string' && path.includes('.')) {
    const keys = path.split('.')
    let current = obj
    for (const key of keys) {
      if (current === null || current === undefined || typeof current !== 'object') {
        return undefined 
      }
      current = current[key]
      if (current === undefined && keys.indexOf(key) < keys.length - 1) {
          return undefined
      }
    }
    return current
  } else {
    // direct property access
    if (typeof obj !== 'object' || obj === null) { 
        return undefined 
    }
    return obj[path] 
  }
}
