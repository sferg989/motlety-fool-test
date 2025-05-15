/* eslint-disable */
import { jest } from '@jest/globals'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import RankedInstrumentService from './ranked-instrument-service'
import RankingsService from './rankings-service'
import QuoteFundamentalsService from './quote-fundamentals-service'
import { Ranking } from '~types/rankings'
import { QuoteFundamentals } from '~types/quotes'

// Mock the quotes service module instead of spying on it
jest.mock('./quotes-service', () => ({
  getQuote: jest.fn().mockImplementation(() => mockQuoteData),
}))

// Create mock data
const mockRankingsData = [
  {
    currentRank: { value: 1, asOfDate: '2023-01-01' },
    latestRecommendation: 'BUY',
    instrument: {
      instrumentId: 123,
      symbol: 'AAPL',
      name: 'Apple Inc.',
      exchange: 'NASDAQ',
      quote: {
        currentPrice: { amount: 150 },
        priceChange: { amount: 2 },
        percentChange: 1.5,
        lastTradeDate: '2023-01-01',
      },
    },
  },
  {
    currentRank: { value: 2, asOfDate: '2023-01-01' },
    latestRecommendation: 'HOLD',
    instrument: {
      instrumentId: 456,
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      exchange: 'NASDAQ',
      quote: {
        currentPrice: { amount: 300 },
        priceChange: { amount: 5 },
        percentChange: 1.7,
        lastTradeDate: '2023-01-01',
      },
    },
  },
]

const mockQuoteFundamentals = {
  pe: 20,
  eps: 5,
  dividendYield: 0.02,
  marketCap: 1000000000,
  fiftyTwoWeekHigh: 120,
  fiftyTwoWeekLow: 80,
}

const mockQuoteData = {
  currentPrice: { amount: 100, currencyCode: 'USD' },
  priceChange: { amount: 5 },
  percentChange: 0.05,
  lastTradeDate: '2023-01-01',
  dividendYield: 0.02,
  dailyRange: {
    min: { amount: 95 },
    max: { amount: 105 },
  },
  fiftyTwoWeekRange: {
    min: { amount: 80 },
    max: { amount: 120 },
  },
  marketCap: { amount: 1000000000, currencyCode: 'USD' },
}

// Create spy variables
let mockGetTopRankings
let mockGetQuoteFundamentals

describe('RankedInstrumentService', () => {
  let mockApolloClient: Partial<ApolloClient<NormalizedCacheObject>>

  beforeEach(() => {
    // Reset singletons
    RankedInstrumentService.resetInstance()

    QuoteFundamentalsService.resetInstance()

    // Setup mock Apollo client - using Partial to avoid type errors
    mockApolloClient = {
      query: jest.fn().mockImplementation(() =>
        Promise.resolve({
          data: {},
        }),
      ) as unknown as ApolloClient<NormalizedCacheObject>['query'],
    }

    // Setup spies on the services
    mockGetTopRankings = jest.spyOn(RankingsService.prototype, 'getTopRankings').mockImplementation(() => Promise.resolve(mockRankingsData as unknown as Ranking[]))

    mockGetQuoteFundamentals = jest
      .spyOn(QuoteFundamentalsService.prototype, 'getQuoteFundamentals')
      .mockImplementation(() => Promise.resolve(mockQuoteFundamentals as unknown as QuoteFundamentals))

    // Clear mock state
    jest.clearAllMocks()
  })

  afterEach(() => {
    // Restore spies
    mockGetTopRankings.mockRestore()
    mockGetQuoteFundamentals.mockRestore()
  })

  test('getInstance returns the same instance', () => {
    const instance1 = RankedInstrumentService.getInstance(mockApolloClient as ApolloClient<NormalizedCacheObject>)
    const instance2 = RankedInstrumentService.getInstance(mockApolloClient as ApolloClient<NormalizedCacheObject>)

    expect(instance1).toBe(instance2)
  })

  test('getTopRankingsWithCompanyData returns rankings with extended data', async () => {
    const service = RankedInstrumentService.getInstance(mockApolloClient as ApolloClient<NormalizedCacheObject>)

    // Call the service method
    const result = await service.getTopRankingsWithCompanyData()

    // Verify the results
    expect(mockGetTopRankings).toHaveBeenCalled()
    expect(result).toHaveLength(2)

    // Check first ranking
    expect(result[0].currentRank.value).toBe(1)
    expect(result[0].instrument.instrumentId).toBe(123)
    expect(result[0].instrument.symbol).toBe('AAPL')
    expect(result[0].instrument.quoteFundamentals).toEqual(mockQuoteFundamentals)
  }, 10000)

  test('getRankedCompanyDataByInstrumentId returns data for specific instrument', async () => {
    const service = RankedInstrumentService.getInstance(mockApolloClient as ApolloClient<NormalizedCacheObject>)

    // Call the service method
    const result = await service.getRankedCompanyDataByInstrumentId(123)

    // Verify the result
    expect(mockGetTopRankings).toHaveBeenCalled()
    expect(result).not.toBeNull()
    expect(result?.instrument.instrumentId).toBe(123)
    expect(result?.instrument.symbol).toBe('AAPL')
    expect(result?.instrument.quoteFundamentals).toEqual(mockQuoteFundamentals)
  }, 10000)

  test('getRankedCompanyDataByInstrumentId returns null for unknown instrument', async () => {
    const service = RankedInstrumentService.getInstance(mockApolloClient as ApolloClient<NormalizedCacheObject>)

    // Call the service method
    const result = await service.getRankedCompanyDataByInstrumentId(999)

    // Verify the result
    expect(mockGetTopRankings).toHaveBeenCalled()
    expect(result).toBeNull()
  }, 10000)
})
