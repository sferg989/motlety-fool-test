import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import type { QuoteFundamentals, Quote } from '~types/quotes'
import type { WatchedCompany } from '~types/company'
import WatchedInstrumentService from './watched-instrument-service'
import RankedInstrumentService, { RankedCompanyData } from './ranked-instrument-service'

export type CompanyData = {
  instrumentId: number
  symbol: string
  name: string
  quote: Quote
  quoteFundamentals: QuoteFundamentals
}

class CompanyService {
  private static instance: CompanyService | null = null
  private watchedInstrumentService: WatchedInstrumentService
  private rankedInstrumentService: RankedInstrumentService

  private constructor(apolloClient: ApolloClient<NormalizedCacheObject>) {
    this.watchedInstrumentService = WatchedInstrumentService.getInstance(apolloClient)
    this.rankedInstrumentService = RankedInstrumentService.getInstance(apolloClient)
  }

  public static getInstance(apolloClient: ApolloClient<NormalizedCacheObject>): CompanyService {
    if (!CompanyService.instance) {
      CompanyService.instance = new CompanyService(apolloClient)
    }
    return CompanyService.instance
  }

  public static resetInstance(): void {
    CompanyService.instance = null
  }

  // Transform watched company data to common format
  private transformWatchedCompany(company: WatchedCompany & { quote: Quote; quoteFundamentals: QuoteFundamentals }): CompanyData {
    return {
      instrumentId: company.instrumentId,
      symbol: company.symbol,
      name: company.name,
      quote: company.quote,
      quoteFundamentals: company.quoteFundamentals,
    }
  }

  // Transform ranked company data to common format
  private transformRankedCompany(rankedCompany: RankedCompanyData): CompanyData {
    return {
      instrumentId: rankedCompany.instrument.instrumentId,
      symbol: rankedCompany.instrument.symbol,
      name: rankedCompany.instrument.name,
      quote: {
        currentPrice: rankedCompany.instrument.quote.currentPrice,
        priceChange: rankedCompany.instrument.quote.priceChange,
        percentChange: rankedCompany.instrument.quote.percentChange,
        lastTradeDate: rankedCompany.instrument.quote.lastTradeDate,
        dividendYield: rankedCompany.instrument.quote.dividendYield,
        dailyRange: rankedCompany.instrument.dailyRange,
        fiftyTwoWeekRange: rankedCompany.instrument.fiftyTwoWeekRange,
        marketCap: rankedCompany.instrument.quote.marketCap,
        revenueGrowth: rankedCompany.instrument.quote.revenueGrowth,
        grossMargin: rankedCompany.instrument.quote.grossMargin,
        peRatio: rankedCompany.instrument.quote.peRatio,
        beta5y: rankedCompany.instrument.quote.beta5y,
      },
      quoteFundamentals: rankedCompany.instrument.quoteFundamentals,
    }
  }

  async getCompanyDataByInstrumentId(instrumentId: number): Promise<CompanyData | null> {
    const rankedCompany = await this.rankedInstrumentService.getRankedCompanyDataByInstrumentId(instrumentId)

    if (rankedCompany) {
      return this.transformRankedCompany(rankedCompany)
    }

    const watchedCompany = await this.watchedInstrumentService.getWatchedCompanyDataByInstrumentId(instrumentId)

    if (watchedCompany) {
      return this.transformWatchedCompany(watchedCompany)
    }

    return null
  }

  async getWatchedCompanyDataByInstrumentId(instrumentId: number): Promise<CompanyData | null> {
    const watchedCompany = await this.watchedInstrumentService.getWatchedCompanyDataByInstrumentId(instrumentId)
    if (watchedCompany) {
      return this.transformWatchedCompany(watchedCompany)
    }
    return null
  }
}

export default CompanyService
