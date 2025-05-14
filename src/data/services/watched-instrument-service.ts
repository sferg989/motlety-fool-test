import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { GET_WATCHED_INSTRUMENTS } from '~data/queries'
import type { QuoteFundamentals, Quote } from '~types/quotes'
import type { WatchedCompany } from '~types/company'
import { getQuote, getRealtimeQuotes } from './quotes-service'
import QuoteFundamentalsService from './quote-fundamentals-service'

class WatchedInstrumentService {
  private static instance: WatchedInstrumentService | null = null;
  private client: ApolloClient<NormalizedCacheObject>
  private isFirstLoad: boolean = true
  private quoteFundamentalsService: QuoteFundamentalsService
  private quoteData: Quote
  
  private constructor(apolloClient: ApolloClient<NormalizedCacheObject>) {
    this.client = apolloClient
    this.quoteFundamentalsService = QuoteFundamentalsService.getInstance(apolloClient)
    this.quoteData = getQuote()
  }

  public static getInstance(apolloClient: ApolloClient<NormalizedCacheObject>): WatchedInstrumentService {
    if (!WatchedInstrumentService.instance) {
      WatchedInstrumentService.instance = new WatchedInstrumentService(apolloClient);
    }
    return WatchedInstrumentService.instance;
  }

  public static resetInstance(): void {
    WatchedInstrumentService.instance = null;
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

  async getWatchedCompanyDataByInstrumentId(instrumentId: number): Promise<WatchedCompany & { quote: Quote, quoteFundamentals: QuoteFundamentals } | null> {
    const companies = await this.getWatchedInstrumentsWithQuotes()
    return companies.find(company => company.instrumentId === instrumentId) || null
  }

  async getWatchedInstrumentsWithQuotes(): Promise<(WatchedCompany & { quote: Quote, quoteFundamentals: QuoteFundamentals })[]> {
    return this.simulateDelay(async () => {
      const { data } = await this.client.query({
        query: GET_WATCHED_INSTRUMENTS,
      })
      const watchedInstruments = data.instruments as WatchedCompany[]
      const instrumentIds = watchedInstruments.map(instrument => instrument.instrumentId)
      const realtimeQuotes = getRealtimeQuotes(instrumentIds)
      const quoteFundamentals = await this.quoteFundamentalsService.getQuoteFundamentals()
      
      return watchedInstruments.map(instrument => {
        const instrumentId = instrument.instrumentId.toString()
        const realtimeQuote = realtimeQuotes[instrumentId]
        
        return {
          ...instrument,
          quote: {
            currentPrice: {
              amount: realtimeQuote.current_price,
              currencyCode: realtimeQuote.currency,
            },
            priceChange: {
              amount: realtimeQuote.change,
            },
            percentChange: realtimeQuote.percent_change,
            lastTradeDate: realtimeQuote.last_trade_date,
            dividendYield: this.quoteData.dividendYield,
            dailyRange: {
              min: { amount: this.quoteData.dailyRange.min.amount },
              max: { amount: this.quoteData.dailyRange.max.amount },
            },
            fiftyTwoWeekRange: {
              min: { amount: this.quoteData.fiftyTwoWeekRange.min.amount },
              max: { amount: this.quoteData.fiftyTwoWeekRange.max.amount },
            },
            marketCap: {
              amount: this.quoteData.marketCap.amount,
              currencyCode: realtimeQuote.currency,
            },
            revenueGrowth: this.quoteData.revenueGrowth,
            grossMargin: this.quoteData.grossMargin,
            peRatio: this.quoteData.peRatio,
            beta5y: this.quoteData.beta5y,
          },
          quoteFundamentals
        }
      })
    })
  }
}

export default WatchedInstrumentService 