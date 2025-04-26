
export {
  visualTypes,
}
export type {
  Visual, 
}

const visualTypes = [
  `bar-chart`, 
  `gauge`, 
  `line-chart`, 
  `pie-chart`, 
  `table`,
] as const

type Visual = typeof visualTypes[number]
