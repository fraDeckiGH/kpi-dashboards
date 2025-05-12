
export {
  pick,
}

/**
 * Creates an object composed of the picked object properties.
 * Paths can be simple (e.g., 'a') or nested (e.g., 'a.b.c').
 * If a path segment refers to an array and there are subsequent path segments,
 * it will attempt to pick the remaining path from each element in the array.
 *
 * @template T The type of the source object.
 * @param {T} source The source object.
 * @param {string[]} paths An array of strings representing the paths to pick.
 * @returns {Partial<T>} A new object with the picked properties.
 *
 * @example
 * const obj = { a: 1, b: { c: 2, d: 3 }, e: [{f: 4, g: 5}, {f: 6, g: 7}] };
 * pick(obj, ['a', 'b.c', 'e.f']);
 * // returns { a: 1, b: { c: 2 }, e: [{f: 4}, {f: 6}] }
 */
function pick<T extends object>(source: T, paths: string[] = []): Partial<T> {
  const result = {} as Partial<T>

  for (const path of paths) {
    const pathSegments = path.split('.')
    let currentSourceSubtree = source as any // The part of the source object we are currently looking at
    let currentResultSubtree = result as any // The part of the result object we are currently building

    for (let i = 0; i < pathSegments.length; i++) {
      const segment = pathSegments[i]
      
      if (typeof currentSourceSubtree !== 'object' || currentSourceSubtree === null) {
        break // Stop processing this path, cannot go deeper
      }

      const valueAtSegment = currentSourceSubtree[segment]

      if (valueAtSegment === undefined) {
        break // Stop processing this path, value doesn't exist
      }

      if (i === pathSegments.length - 1) { // This is the last segment in the path
        currentResultSubtree[segment] = valueAtSegment
      } else { // Not the last segment, so we need to go deeper
        if (Array.isArray(valueAtSegment)) {
          const remainingPath = pathSegments.slice(i + 1).join('.')
          currentResultSubtree[segment] = valueAtSegment.map(element => {
            if (typeof element === 'object' && element !== null) {
              return pick(element, [remainingPath]) // Recursively pick from element
            }
            // If element is not an object, it cannot have the 'remainingPath' picked from it.
            // Return an empty object as per pick's behavior for non-matching structures.
            return {}
          })
          break // Current path fully processed (due to array mapping handling the rest)
        } else if (typeof valueAtSegment === 'object' && valueAtSegment !== null) {
          currentResultSubtree[segment] = currentResultSubtree[segment] || {}
          currentResultSubtree = currentResultSubtree[segment]
          currentSourceSubtree = valueAtSegment
        } else {
          // It's a primitive value, but we expected an object/array to go deeper.
          break // Cannot proceed further down this path.
        }
      }
    }
  }
  return result
}
