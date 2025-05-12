
export type Author = {
  authorId: number
  byline: string
}

export type ArticleListItem = {
  headline: string
  byline: string
  promo: string
  publishAt: string
  averageRating: number
  commentCount: number | null
  path: string
  productId: number
  uuid: string
  staticPage: boolean
  authors: {
    author: Author
    primary: boolean
  }[]
  hasVideo: boolean
}

export type LatestRecommendation = {
  path: string
  productId: number
  publishAt: string
  uuid: string
}

export type ArticleDetail = {
  visibility: number
  publish_at: string
  video_aired_date: string | null
  created: string
  modified: string
  last_updated: string
  path: string
  static_page: boolean
  product_id: number
  headline: string
  slug: string
  primary_instrument_ids: number[]
  author_override: string | null
  primary_author_id: number
  recommendations: {
    uuid: string
    prelevels_uuid: string | null
    action: string
    action_date: string
    options_strategy: string | null
    instrument: {
      instrument_id: number
      company_name: string
      exchange: string
      symbol: string
      asset_class: string
      sector: {
        sector_id: number
        name: string
      }
      industry: {
        industry_id: number
        name: string
      }
      seo_name: string
      valid: boolean
      benchmarks: any[]
      links: {
        self: string
        content: string
      }
    }
    rationale: any[]
    allocation: string
    portfolio_id: string
    portfolio_name: string
  }[]
  has_recommendation: boolean
  sentiment: string | null
  body: string
  disclosure: string
  promo: string
  images_json: string
  video_show_host_ids: any[]
  description: string | null
  title: string | null
  level: string | null
  house_slugs: any[]
  key_points: any[]
  has_video: boolean
  ai_summary: string[]
  average_rating: number
  comment_count: number | null
  video_duration: number | null
  text: string | null
  authors: {
    primary: boolean
    contributor_type: string
    author_id: number
    first_name: string
    last_name: string
    username: string
    twitter_username: string | null
    byline: string
    email: string
    short_bio: string
    long_bio: string
    additional_disclosure: string | null
    small_avatar_url: string
    large_avatar_url: string
    show_host: string | null
  }[]
  bureau: string | null
  investingteam: string | null
  images: any[]
  video: string | null
  pitch: string | null
  byline: string
}
