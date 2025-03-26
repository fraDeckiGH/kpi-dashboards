import { Storyboard } from "@/lib/db"

export {
  storyboards, 
}

const storyboards: Storyboard[] = [
  {
    id: `storyboard-1`,
    name: `Q1 2025 Global Performance Review`,
    descShort: `Overview of key performance indicators for the first quarter`,
    lastUpdate: `03/15/2025`,
    sentiment: { favorite: true, trending: false, featured: false },
    type: `storyboard`,
    applicableAffiliates: [
      'affiliate-1',
      'affiliate-2',
      'affiliate-3',
      'affiliate-4',
      'affiliate-5',
      'affiliate-6',
      'affiliate-7',
    ],
    kpisApplied: [`sales-growth-yoy-eu`, `software-mrr`, `overall-csat-score`],
  },
  {
    id: `storyboard-2`,
    name: `Europe Sales Strategy Update`,
    descShort: `Deep dive into the European sales performance and strategy`,
    lastUpdate: `03/20/2025`,
    sentiment: { favorite: false, trending: true, featured: false },
    type: `storyboard`,
    applicableAffiliates: ['affiliate-1'],
    kpisApplied: [`sales-growth-yoy-eu`, `customer-acquisition-na`, `churn-rate-apac`],
  },
  {
    id: `storyboard-3`,
    name: `Software Customer Retention Analysis`,
    descShort: `Analyzing customer churn and retention for software solutions`,
    lastUpdate: `03/24/2025`,
    sentiment: { favorite: false, trending: false, featured: true },
    type: `storyboard`,
    applicableAffiliates: ['affiliate-5'],
    kpisApplied: [`software-mrr`, `churn-rate-apac`],
  },
  {
    id: `storyboard-4`,
    name: `North America Growth Initiatives`,
    descShort: `Review of initiatives aimed at increasing growth in North America`,
    lastUpdate: `03/18/2025`,
    sentiment: { favorite: false, trending: false, featured: false },
    type: `storyboard`,
    applicableAffiliates: ['affiliate-3'],
    kpisApplied: [`customer-acquisition-na`],
  },
]
