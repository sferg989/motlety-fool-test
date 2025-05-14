import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import type { QuoteFundamentals, Quote } from '~types/quotes'
import type { Ranking } from '~types/rankings'
import { getQuote } from './quotes-service'
import RankingsService from './rankings-service'
import QuoteFundamentalsService from './quote-fundamentals-service'

export type RankedCompanyData = Ranking & {
  instrument: Ranking['instrument'] & {
    quoteFundamentals: QuoteFundamentals;
    dailyRange: {
      min: { amount: number };
      max: { amount: number };
    };
    fiftyTwoWeekRange: {
      min: { amount: number };
      max: { amount: number };
    };
  }
}

class RankedInstrumentService {
  private static instance: RankedInstrumentService | null = null;
  private client: ApolloClient<NormalizedCacheObject>
  private isFirstLoad: boolean = true
  private rankingsService: RankingsService
  private quoteFundamentalsService: QuoteFundamentalsService
  private quoteData: Quote
  
  private constructor(apolloClient: ApolloClient<NormalizedCacheObject>) {
    this.client = apolloClient
    this.rankingsService = new RankingsService(apolloClient)
    this.quoteFundamentalsService = QuoteFundamentalsService.getInstance(apolloClient)
    this.quoteData = getQuote()
  }

  public static getInstance(apolloClient: ApolloClient<NormalizedCacheObject>): RankedInstrumentService {
    if (!RankedInstrumentService.instance) {
      RankedInstrumentService.instance = new RankedInstrumentService(apolloClient);
    }
    return RankedInstrumentService.instance;
  }

  public static resetInstance(): void {
    RankedInstrumentService.instance = null;
  }

  private async simulateDelay<T>(callback: () => Promise<T>): Promise<T> {
    const delay = this.isFirstLoad ? 1000 : 0
    this.isFirstLoad = false
    return new Promise((resolve) => {
      setTimeout(async () => {
        const result = await callback()
        resolve(result)
      }, delay)
    })
  }

  async getTopRankingsWithCompanyData(): Promise<RankedCompanyData[]> {
    return this.simulateDelay(async () => {
      const rankings = await this.rankingsService.getTopRankings()
      const quoteFundamentals = await this.quoteFundamentalsService.getQuoteFundamentals()
      
      return rankings.map(ranking => ({
        ...ranking,
        instrument: {
          ...ranking.instrument,
          quoteFundamentals,
          dailyRange: {
            min: { amount: this.quoteData.dailyRange.min.amount },
            max: { amount: this.quoteData.dailyRange.max.amount },
          },
          fiftyTwoWeekRange: {
            min: { amount: this.quoteData.fiftyTwoWeekRange.min.amount },
            max: { amount: this.quoteData.fiftyTwoWeekRange.max.amount },
          }
        }
      }))
    })
  }

  async getRankedCompanyDataByInstrumentId(instrumentId: number): Promise<RankedCompanyData | null> {
    return this.simulateDelay(async () => {
      const rankings = await this.rankingsService.getTopRankings()
      const quoteFundamentals = await this.quoteFundamentalsService.getQuoteFundamentals()
      
      const company = rankings.find(ranking => ranking.instrument.instrumentId === instrumentId)
      
      if (!company) return null
      
      return {
        ...company,
        instrument: {
          ...company.instrument,
          quoteFundamentals,
          dailyRange: {
            min: { amount: this.quoteData.dailyRange.min.amount },
            max: { amount: this.quoteData.dailyRange.max.amount },
          },
          fiftyTwoWeekRange: {
            min: { amount: this.quoteData.fiftyTwoWeekRange.min.amount },
            max: { amount: this.quoteData.fiftyTwoWeekRange.max.amount },
          }
        }
      }
    })
  }
}

export default RankedInstrumentService 