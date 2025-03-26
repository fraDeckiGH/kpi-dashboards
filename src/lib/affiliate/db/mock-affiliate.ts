
export {
  affiliates, 
}
export type {
  Affiliate,
}

/** subsidiary */
type Affiliate = {
  id: string
  name: string
}

const affiliates: Affiliate[] = [
  { id: 'affiliate-1', name: 'GlobalTech Europe Ltd.' },
  { id: 'affiliate-2', name: 'GlobalTech Asia Pacific Pte. Ltd.' },
  { id: 'affiliate-3', name: 'GlobalTech North America Corp.' },
  { id: 'affiliate-4', name: 'GlobalTech Brazil S.A.' },
  { id: 'affiliate-5', name: 'GlobalTech Software Solutions' },
  { id: 'affiliate-6', name: 'GlobalTech Hardware Manufacturing' },
  { id: 'affiliate-7', name: 'GlobalTech Cloud Services' },
  { id: 'affiliate-8', name: 'GlobalTech Research & Development' },
  { id: 'affiliate-9', name: 'InnovateSoft Corp.' },
  { id: 'affiliate-10', name: 'HealthFirst Europe' },
  { id: 'affiliate-11', name: 'AutoDrive Asia' },
  { id: 'affiliate-12', name: 'EcoSolutions Americas' },
]
