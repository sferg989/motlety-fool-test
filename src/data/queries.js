import {gql} from '@apollo/client'

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      home_url
      short_name
      long_name
      abbreviation
      slug
      product_description
      product_type
      rank
      root_path
      show_in_nav
      is_archived
      pre_launch
      membership_required
      level
      child_products
      product_what_is
      allows_comments
      community_id
      modified
    }
  }
`

export const GET_WATCHED_INSTRUMENTS = gql`
  query GetWatchedInstruments {
    instruments {
      instrumentId
      symbol
      name
      exchange
    }
  }
`

export const GET_TOP_RANKINGS = gql`
  query GetTopRankings {
    rankings {
      currentRank {
        asOfDate
        value
      }
      instrument {
        exchange
        instrumentId
        name
        symbol
        sector
        quoteHistoricalSummary {
          oneYearReturnPercent
          fiveYearReturnPercent
        }
        quote {
          currentPrice {
            amount
            currencyCode
          }
          dividendYield
          lastTradeDate
          marketCap {
            amount
            currencyCode
          }
          revenueGrowth
          grossMargin
          peRatio
          beta5y
          percentChange
          priceChange {
            amount
          }
        }
        quantScore {
          analystScore
          capsScore
          rank
          recencyScore
          serviceScore
          trend
          value
        }
      }
      latestRecommendation {
        path
        productId
        publishAt
        uuid
      }
    }
  }
`

export const GET_ARTICLE_LIST = gql`
  query GetArticles {
    articles {
      headline
      byline
      promo
      publishAt
      averageRating
      commentCount
      path
      productId
      uuid
      staticPage
      authors {
        author {
          authorId
          byline
        }
        primary
      }
      hasVideo
    }
  }
`

export const GET_COMPANY_DATA = gql`
  query GetCompanyData($instrumentId: Int!) {
    instrument {
      id
      quote {
        currency {
          code
        }
        dividendYield
        dailyRange {
          max {
            amount
          }
          min {
            amount
          }
        }
        currentPrice {
          amount
        }
        beta5y
        marketCap {
          amount
        }
        fiftyTwoWeekRange {
          max {
            amount
          }
          min {
            amount
          }
        }
        grossMargin
        lastTradeDate
        percentChange
        priceChange {
          amount
        }
        shortInterestRatio
        annualDividend {
          amount
        }
        extendedHoursChange
        extendedHoursDate
        extendedHoursPercentChange
        extendedHoursPrice
        extendedHoursType
        description
      }
      quantScore {
        trend
        value
        serviceScore
        recencyScore
        pastScores {
          value
          asOfDate
        }
        capsScore
        asOfDate
        analystScore
      }
      quoteHistoricalSummary {
        fiveYearReturnPercent
        sinceIPOReturnPercent
        benchmarkFiveYearReturnPercent
        benchmarkOneYearReturnPercent
        oneYearReturnPercent
        fiveYearAnnualizedReturnPercent
        benchmarkFiveYearAnnualizedReturnPercent
        benchmarkSinceIPOReturnPercent
      }
      quoteFundamentals {
        dynamic {
          ceo {
            data {
              value
            }
          }
          marketCapPerEmployee {
            data {
              value
            }
          }
          website {
            data {
              value
            }
          }
          marketCapitalization {
            data {
              value
              unit
            }
          }
          numberOfEmployees {
            data {
              value
            }
          }
        }
        annual {
          revenue {
            data {
              date
            }
          }
        }
        quarterly {
          revenue {
            data {
              date
            }
          }
        }
      }
      symbol
      exchange
      name
      instrumentId
      peerInstruments {
        instrumentId
        name
        symbol
        quote {
          currentPrice {
            amount
            currencyCode
          }
          priceChange {
            amount
            currencyCode
          }
        }
      }
    }
  }
`