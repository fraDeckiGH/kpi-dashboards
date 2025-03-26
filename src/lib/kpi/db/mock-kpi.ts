import { Kpi } from "@/lib/db"

export {
  kpis, 
}

const kpis: Record<Kpi["id"], Kpi> = {
  'sales-growth-yoy-eu': {
    id: `sales-growth-yoy-eu`,
    name: `Europe Sales Growth YoY`,
    descShort: `Year-over-year sales growth in Europe`,
    lastUpdate: `03/23/2025`,
    sentiment: { favorite: true, trending: false, featured: true },
    type: 'kpi',
    addressedQuestions: [
      { 
        question: `How is our European market performing compared to last year?`,
        explShort: `Understand growth trends in Europe.`,
      },
      { 
        question: `Are our European sales initiatives effective?`,
        explShort: `Measure the impact of sales strategies.`,
      },
    ],
    affiliatesApplicability: true,
    calculationFormula: `((Current Year Sales - Previous Year Sales) / Previous Year Sales) * 100%`,
    desc: `Measures the percentage change in sales revenue in the European market compared to the same period last year.`,
    metrics: [`total-sales-revenue-eu`, `prev-year-sales-revenue-eu`],
    recommendedVisual: `line-chart`,
    selectedVisual: `line-chart`,
    visualsAvailable: [`line-chart`],
  },
  'software-mrr': {
    id: `software-mrr`,
    name: `Software MRR`,
    descShort: `Monthly Recurring Revenue for Software Solutions`,
    lastUpdate: `03/24/2025`,
    sentiment: { favorite: true, trending: true, featured: false },
    type: 'kpi',
    addressedQuestions: [
      { 
        question: `What is the consistent revenue generated by our software products?`,
        explShort: `Track the stability of our software revenue stream.`,
      },
      { 
        question: `Is our software subscription base growing?`,
        explShort: `Monitor the growth of recurring software income.`,
      },
    ],
    affiliatesApplicability: true,
    calculationFormula: `Sum of all active software subscription fees billed monthly`,
    desc: `Represents the total predictable revenue that the Software Solutions subsidiary expects to receive every month from its active subscriptions.`,
    metrics: [`active-subs-no`, `avg-sub-value`],
    recommendedVisual: `line-chart`,
    selectedVisual: `bar-chart`,
    visualsAvailable: [`bar-chart`, `gauge`, `line-chart`, `pie-chart`, `table`],
  },
  'overall-csat-score': {
    id: `overall-csat-score`,
    name: `Overall Customer Satisfaction Score`,
    descShort: `Average customer satisfaction across all products/services`,
    lastUpdate: `03/20/2025`,
    sentiment: { favorite: false, trending: false, featured: false },
    type: 'kpi',
    addressedQuestions: [
      { 
        question: `How satisfied are our customers overall?`,
        explShort: `Get a general sense of customer happiness.`,
      },
      { 
        question: `Are our products and services meeting customer expectations?`,
        explShort: `Measure the quality of our offerings from the customer perspective.`,
      },
    ],
    affiliatesApplicability: false,
    calculationFormula: `Average score from customer satisfaction surveys`,
    desc: `The average score derived from customer satisfaction surveys across all business units and product lines.`,
    metrics: [`customer-survey-score`, `survey-responses-no`],
    recommendedVisual: `gauge`,
    selectedVisual: `line-chart`,
    visualsAvailable: [`gauge`, `bar-chart`, `line-chart`],
  },
  'hardware-defects-rate': {
    id: `hardware-defects-rate`,
    name: `Hardware Production Defects Rate`,
    descShort: `Percentage of defective hardware units produced`,
    lastUpdate: `03/22/2025`,
    sentiment: { favorite: false, trending: false, featured: true },
    type: 'kpi',
    addressedQuestions: [
      { 
        question: `What is the quality of our hardware manufacturing process?`,
        explShort: `Monitor the rate of defects in production.`,
      },
      { 
        question: `Are we meeting our quality control standards for hardware?`,
        explShort: `Track adherence to quality guidelines.`,
      },
    ],
    affiliatesApplicability: true,
    calculationFormula: `(Number of Defective Units / Total Units Produced) * 100%`,
    desc: `The percentage of hardware units produced by the manufacturing subsidiary that are identified as defective during quality control checks.`,
    metrics: [`defective-units-no`, `total-units-produced`],
    recommendedVisual: `table`,
    selectedVisual: `pie-chart`,
    visualsAvailable: [`gauge`, `line-chart`, `pie-chart`, `table`],
  },
  'cloud-service-uptime': {
    id: `cloud-service-uptime`,
    name: `Cloud Service Uptime`,
    descShort: `Percentage of time cloud services are operational`,
    lastUpdate: `03/24/2025`,
    sentiment: { favorite: true, trending: false, featured: false },
    type: 'kpi',
    addressedQuestions: [
      { 
        question: `How reliable is our cloud service?`,
        explShort: `Measure the availability of our cloud platform.`,
      },
      { 
        question: `Are we meeting our service level agreements (SLAs) for uptime?`,
        explShort: `Track our performance against promised uptime guarantees.`,
      },
    ],
    affiliatesApplicability: true,
    calculationFormula: `(Total Uptime / Total Possible Uptime) * 100%`,
    desc: `Represents the percentage of time that the Cloud Services subsidiary's platform is operational and available to users.`,
    metrics: [`total-uptime-mins`, `total-possible-uptime-mins`],
    recommendedVisual: `gauge`,
    selectedVisual: `gauge`,
    visualsAvailable: [`gauge`, `line-chart`, `table`],
  },
  'customer-acquisition-na': {
    id: `customer-acquisition-na`,
    name: `North America New Customer Acquisition`,
    descShort: `Number of new customers acquired in North America`,
    lastUpdate: `03/23/2025`,
    sentiment: { favorite: false, trending: false, featured: false },
    type: 'kpi',
    addressedQuestions: [
      { 
        question: `How many new customers are we gaining in the North American market?`,
        explShort: `Track the growth of our customer base in North America.`,
      },
      { 
        question: `Are our North American marketing efforts effective in attracting new customers?`,
        explShort: `Measure the success of our acquisition strategies.`,
      },
    ],
    affiliatesApplicability: true,
    calculationFormula: `Count of new customer accounts created in North America`,
    desc: `The total number of new customer accounts acquired by the North America subsidiary during a specific period.`,
    metrics: [`new-accounts-no`],
    recommendedVisual: `line-chart`,
    selectedVisual: `line-chart`,
    visualsAvailable: [`bar-chart`, `gauge`, `line-chart`, `pie-chart`],
  },
  'market-share-br': {
    id: `market-share-br`,
    name: `Brazil Market Share`,
    descShort: `Our percentage of the total market in Brazil`,
    lastUpdate: `03/21/2025`,
    sentiment: { favorite: false, trending: false, featured: false },
    type: 'kpi',
    addressedQuestions: [
      { 
        question: `What is our competitive position in the Brazilian market?`,
        explShort: `Understand our share of the market in Brazil.`,
      },
      { 
        question: `Are we gaining or losing market share in Brazil?`,
        explShort: `Track our competitive growth over time.`,
      },
    ],
    affiliatesApplicability: true,
    calculationFormula: `(Our Sales in Brazil / Total Market Sales in Brazil) * 100%`,
    desc: `Represents the percentage of the total market sales within Brazil that are captured by the GlobalTech Brazil S.A. subsidiary.`,
    metrics: [`sales-br`, `total-market-sales-br`],
    recommendedVisual: `pie-chart`,
    selectedVisual: `pie-chart`,
    visualsAvailable: [`bar-chart`, `pie-chart`],
  },
  'churn-rate-apac': {
    id: `churn-rate-apac`,
    name: `Asia Pacific Customer Churn Rate`,
    descShort: `Percentage of customers lost in Asia Pacific`,
    lastUpdate: `03/24/2025`,
    sentiment: { favorite: false, trending: false, featured: false },
    type: 'kpi',
    addressedQuestions: [
      { 
        question: `How many customers are leaving us in the Asia Pacific region?`,
        explShort: `Monitor customer attrition in Asia Pacific.`,
      },
      { 
        question: `Are our customer retention efforts in Asia Pacific effective?`,
        explShort: `Measure our ability to keep customers in this region.`,
      },
    ],
    affiliatesApplicability: true,
    calculationFormula: `(Number of Customers Lost / Total Number of Customers at Start of Period) * 100%`,
    desc: `The percentage of customers of the Asia Pacific subsidiary who discontinued their service or subscription during a specific period.`,
    metrics: [`customers-lost-no`, `total-customers-no`],
    recommendedVisual: `bar-chart`,
    selectedVisual: `bar-chart`,
    visualsAvailable: [`bar-chart`, `table`],
  },
  'innovatesoft-social-engagement': {
    id: `innovatesoft-social-engagement`,
    name: `InnovateSoft Social Media Engagement`,
    descShort: `Engagement rate on InnovateSoft social media channels`,
    lastUpdate: `03/23/2025`,
    sentiment: { favorite: true, trending: false, featured: false },
    type: 'kpi',
    addressedQuestions: [
      { 
        question: `How engaged is the audience with InnovateSoft's social media content?`,
        explShort: `Measure interaction levels on social platforms.`,
      },
      { 
        question: `Is our social media strategy for InnovateSoft effective?`,
        explShort: `Track the success of our social media campaigns.`,
      },
    ],
    affiliatesApplicability: false,
    calculationFormula: `(Total Engagements (Likes, Shares, Comments) / Total Reach or Impressions) * 100%`,
    desc: `The average engagement rate across all social media platforms for the InnovateSoft Corp. subsidiary.`,
    metrics: [`total-engagements-no`, `total-reach-impressions-no`],
    recommendedVisual: `table`,
    selectedVisual: `bar-chart`,
    visualsAvailable: [`bar-chart`, `line-chart`, `table`],
  },
  'globaltech-web-traffic': {
    id: `globaltech-web-traffic`,
    name: `GlobalTech Website Traffic`,
    descShort: `Total traffic to the main GlobalTech website`,
    lastUpdate: `03/24/2025`,
    sentiment: { favorite: false, trending: true, featured: false },
    type: 'kpi',
    addressedQuestions: [
      { 
        question: `How much traffic is our main website receiving?`,
        explShort: `Monitor overall website visits.`,
      },
      { 
        question: `Is our online presence growing?`,
        explShort: `Track trends in website visitors.`,
      },
    ],
    affiliatesApplicability: false,
    calculationFormula: `Total number of visits to www.globaltech.com`,
    desc: `The total number of visits to the main GlobalTech Inc. corporate website.`,
    metrics: [`website-visits-no`],
    recommendedVisual: `line-chart`,
    selectedVisual: `pie-chart`,
    visualsAvailable: [`line-chart`, `bar-chart`, `pie-chart`],
  },
  'rd-project-completion': {
    id: `rd-project-completion`,
    name: `Research Project Completion Rate`,
    descShort: `Percentage of research projects completed on time`,
    lastUpdate: `03/22/2025`,
    sentiment: { favorite: false, trending: false, featured: false },
    type: 'kpi',
    addressedQuestions: [
      { 
        question: `How efficient is our Research & Development subsidiary in completing projects?`,
        explShort: `Measure the timeliness of R&D efforts.`,
      },
      { 
        question: `Are we meeting our project deadlines in R&D?`,
        explShort: `Track our ability to deliver research outcomes on schedule.`,
      },
    ],
    affiliatesApplicability: true,
    calculationFormula: `(Number of Projects Completed On Time / Total Number of Projects Completed) * 100%`,
    desc: `The percentage of research projects completed by the GlobalTech Research & Development subsidiary within their initially planned timelines.`,
    metrics: [`projects-completed-ontime-no`, `total-projects-completed-no`],
    recommendedVisual: `bar-chart`,
    selectedVisual: `bar-chart`,
    visualsAvailable: [`bar-chart`],
  },
  'healthfirst-eu-csat': {
    id: `healthfirst-eu-csat`,
    name: `HealthFirst Europe Customer Satisfaction`,
    descShort: `Customer satisfaction score for HealthFirst Europe`,
    lastUpdate: `03/23/2025`,
    sentiment: { favorite: true, trending: false, featured: false },
    type: 'kpi',
    addressedQuestions: [
      { 
        question: `How satisfied are HealthFirst Europe customers?`,
        explShort: `Measure customer happiness for this specific subsidiary.`,
      },
      { 
        question: `Are HealthFirst Europe's services meeting customer expectations?`,
        explShort: `Track the quality of their offerings from the customer perspective.`,
      },
    ],
    affiliatesApplicability: false,
    calculationFormula: `Average score from HealthFirst Europe customer satisfaction surveys`,
    desc: `The average customer satisfaction score specifically for the HealthFirst Europe subsidiary, based on their customer feedback.`,
    metrics: [`healthfirst-eu-survey-score`, `healthfirst-eu-responses-no`],
    recommendedVisual: `gauge`,
    selectedVisual: `table`,
    visualsAvailable: [`bar-chart`, `gauge`, `line-chart`, `pie-chart`, `table`],
  },
}
