/* eslint-disable */
import { jest } from '@jest/globals'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import CompanyService from './company-service'
import WatchedInstrumentService from './watched-instrument-service'
import RankedInstrumentService from './ranked-instrument-service'

// Create mock data
const mockWatchedCompanyData = {
  instrumentId: 456,
  symbol: 'GOOGL',
  name: 'Alphabet Inc.',
  quote: {
    currentPrice: { amount: 2500, currencyCode: 'USD' },
    priceChange: { amount: 30 },
    percentChange: 1.2,
    lastTradeDate: '2023-01-01',
  },
  quoteFundamentals: { pe: 30, eps: 83 },
}

const mockRankedCompanyData = {
  instrument: {
    instrumentId: 123,
    symbol: 'AAPL',
    name: 'Apple Inc.',
    quote: {
      currentPrice: { amount: 150 },
      priceChange: { amount: 2 },
      percentChange: 1.5,
      lastTradeDate: '2023-01-01',
    },
    quoteFundamentals: { pe: 25, eps: 6 },
  },
}

// Create direct mock functions instead of mocking entire modules
let mockWatchedGetById
let mockRankedGetById

describe('CompanyService', () => {
  let mockApolloClient: ApolloClient<NormalizedCacheObject>

  beforeEach(() => {
    // Reset the singleton instance before each test
    CompanyService.resetInstance()
    WatchedInstrumentService.resetInstance()
    RankedInstrumentService.resetInstance()

    // Setup mock Apollo client
    mockApolloClient = {
      query: jest.fn().mockResolvedValue({ data: {} } as never),
    } as unknown as ApolloClient<NormalizedCacheObject>

    // Create fresh spies for each test
    mockWatchedGetById = jest.spyOn(WatchedInstrumentService.prototype, 'getWatchedCompanyDataByInstrumentId').mockImplementation(() => Promise.resolve(null))

    mockRankedGetById = jest.spyOn(RankedInstrumentService.prototype, 'getRankedCompanyDataByInstrumentId').mockImplementation(() => Promise.resolve(null))
  })

  afterEach(() => {
    mockWatchedGetById.mockRestore()
    mockRankedGetById.mockRestore()
  })

  test('getInstance should create and return a singleton instance', () => {
    const instance1 = CompanyService.getInstance(mockApolloClient)
    const instance2 = CompanyService.getInstance(mockApolloClient)

    expect(instance1).toBe(instance2)
  }, 10000)

  test('getCompanyDataByInstrumentId should return ranked company data when found', async () => {
    const instrumentId = 123

    // Only ranked service returns data
    mockRankedGetById.mockResolvedValue(mockRankedCompanyData)

    const companyService = CompanyService.getInstance(mockApolloClient)
    const result = await companyService.getCompanyDataByInstrumentId(instrumentId)

    expect(mockRankedGetById).toHaveBeenCalledWith(instrumentId)
    expect(result).toEqual({
      instrumentId: 123,
      symbol: 'AAPL',
      name: 'Apple Inc.',
      quote: {
        currentPrice: { amount: 150 },
        priceChange: { amount: 2 },
        percentChange: 1.5,
        lastTradeDate: '2023-01-01',
      },
      quoteFundamentals: { pe: 25, eps: 6 },
    })
  }, 10000)

  test('getCompanyDataByInstrumentId should return watched company data when ranked is not found', async () => {
    const instrumentId = 456

    // Ranked returns null, watched returns data
    mockRankedGetById.mockResolvedValue(null)
    mockWatchedGetById.mockResolvedValue(mockWatchedCompanyData)

    const companyService = CompanyService.getInstance(mockApolloClient)
    const result = await companyService.getCompanyDataByInstrumentId(instrumentId)

    expect(mockRankedGetById).toHaveBeenCalledWith(instrumentId)
    expect(mockWatchedGetById).toHaveBeenCalledWith(instrumentId)
    expect(result).toEqual(mockWatchedCompanyData)
  }, 10000)

  test('getCompanyDataByInstrumentId should return null when company not found in either service', async () => {
    const instrumentId = 789

    // Both services return null
    mockRankedGetById.mockResolvedValue(null)
    mockWatchedGetById.mockResolvedValue(null)

    const companyService = CompanyService.getInstance(mockApolloClient)
    const result = await companyService.getCompanyDataByInstrumentId(instrumentId)

    expect(result).toBeNull()
  }, 10000)
})
