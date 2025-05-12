
export type QuantScore = {
  analystScore: number
  capsScore: number
  rank: number
  recencyScore: number
  serviceScore: number
  trend: string
  value: number
}

export type Product = {
  id: number
  name: string
  home_url: string
  short_name: string
  long_name: string
  abbreviation: string
  slug: string
  product_description: string
  product_type: string
  rank: number
  root_path: string
  show_in_nav: boolean
  is_archived: boolean
  pre_launch: boolean
  membership_required: boolean
  level: number
  child_products: any[]
  product_what_is: string | null
  allows_comments: boolean
  community_id: number | null
  modified: string
}