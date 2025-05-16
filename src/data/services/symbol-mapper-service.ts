import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { GET_WATCHED_INSTRUMENTS } from '~data/queries'
import type { WatchedCompany } from '~types/company'
import RankingsService from './rankings-service'

interface SymbolMapperInterface {
  getInstrumentIdBySymbol(symbol: string): Promise<number | null>
  getSymbolByInstrumentId(instrumentId: number): Promise<string | null>
  getExchangeBySymbol(symbol: string): Promise<string | null>
  initialize(): Promise<void>
}

class SymbolMapperService implements SymbolMapperInterface {
  private static instance: SymbolMapperService | null = null
  private client: ApolloClient<NormalizedCacheObject>
  private symbolToIdMap: Map<string, number> = new Map()
  private idToSymbolMap: Map<number, string> = new Map()
  private symbolToExchangeMap: Map<string, string> = new Map()
  private initialized: boolean = false
  private rankingsService: RankingsService

  private constructor(apolloClient: ApolloClient<NormalizedCacheObject>) {
    this.client = apolloClient
    this.rankingsService = new RankingsService(apolloClient)
  }

  public static getInstance(apolloClient: ApolloClient<NormalizedCacheObject>): SymbolMapperService {
    if (!SymbolMapperService.instance) {
      SymbolMapperService.instance = new SymbolMapperService(apolloClient)
    }
    return SymbolMapperService.instance
  }

  public static resetInstance(): void {
    SymbolMapperService.instance = null
  }

  private addToMaps(symbol: string, instrumentId: number, exchange: string): void {
    this.symbolToIdMap.set(symbol, instrumentId)
    this.idToSymbolMap.set(instrumentId, symbol)
    this.symbolToExchangeMap.set(symbol, exchange)
  }

  public async initialize(): Promise<void> {
    if (this.initialized) return

    try {
      // Get watched instruments
      await this.initializeFromWatchedInstruments()

      // Get top ranked instruments
      await this.initializeFromTopRankings()

      this.initialized = true
    } catch (error) {
      console.error('Failed to initialize symbol mapping:', error)
      throw error
    }
  }

  private async initializeFromWatchedInstruments(): Promise<void> {
    const { data } = await this.client.query({
      query: GET_WATCHED_INSTRUMENTS,
      fetchPolicy: 'cache-first',
    })

    const instruments = data.instruments as WatchedCompany[]

    instruments.forEach((instrument) => {
      this.addToMaps(instrument.symbol, instrument.instrumentId, instrument.exchange)
    })
  }

  private async initializeFromTopRankings(): Promise<void> {
    const rankings = await this.rankingsService.getTopRankings()

    rankings.forEach((ranking) => {
      const instrument = ranking.instrument

      this.addToMaps(instrument.symbol, instrument.instrumentId, instrument.exchange)
    })
  }

  public async getInstrumentIdBySymbol(symbol: string): Promise<number | null> {
    if (!this.initialized) await this.initialize()
    return this.symbolToIdMap.get(symbol) || null
  }

  public async getSymbolByInstrumentId(instrumentId: number): Promise<string | null> {
    if (!this.initialized) await this.initialize()
    return this.idToSymbolMap.get(instrumentId) || null
  }

  public async getExchangeBySymbol(symbol: string): Promise<string | null> {
    if (!this.initialized) await this.initialize()
    return this.symbolToExchangeMap.get(symbol) || null
  }
}

export default SymbolMapperService
