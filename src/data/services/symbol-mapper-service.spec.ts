/* eslint-disable */
import { jest } from '@jest/globals'
import { ApolloClient } from '@apollo/client'
import SymbolMapperService from './symbol-mapper-service'
import { GET_WATCHED_INSTRUMENTS } from '~data/queries'
import { Ranking } from '~types/rankings'
import { WatchedCompany } from '~types/company'
import { LatestRecommendation } from '~types/articles'

// Mock used modules
jest.mock('~data/queries', () => ({
  GET_WATCHED_INSTRUMENTS: 'GET_WATCHED_INSTRUMENTS',
}))

// Create a custom mock for the RankingsService
class MockRankingsService {
  getTopRankings = jest.fn().mockImplementation(() => {
    return Promise.resolve([
      {
        instrument: {
          symbol: 'GOOG',
          instrumentId: 789,
          name: 'Google',
          exchange: 'NASDAQ',
        },
        currentRank: { value: 1, asOfDate: '2023-01-01' },
        latestRecommendation: {
          path: '/some-path',
          productId: 1,
          publishAt: '2023-01-01',
          uuid: 'abc123',
        },
      },
      {
        instrument: {
          symbol: 'AMZN',
          instrumentId: 101,
          name: 'Amazon',
          exchange: 'NASDAQ',
        },
        currentRank: { value: 2, asOfDate: '2023-01-01' },
        latestRecommendation: {
          path: '/some-path',
          productId: 1,
          publishAt: '2023-01-01',
          uuid: 'def456',
        },
      },
    ] as Ranking[])
  })
}

// Mock the rankings service constructor
jest.mock('./rankings-service', () => {
  return {
    default: jest.fn().mockImplementation(() => {
      return new MockRankingsService()
    }),
  }
})

describe('SymbolMapperService', () => {
  let mockApolloClient: ApolloClient<any>

  beforeEach(() => {
    // Reset singleton instance
    SymbolMapperService.resetInstance()

    // Setup mock Apollo client
    mockApolloClient = {
      query: jest.fn(() =>
        Promise.resolve({
          data: {
            instruments: [
              {
                symbol: 'AAPL',
                instrumentId: 123,
                name: 'Apple',
                exchange: 'NASDAQ',
              },
              {
                symbol: 'MSFT',
                instrumentId: 456,
                name: 'Microsoft',
                exchange: 'NYSE',
              },
            ],
          },
        }),
      ),
    } as unknown as ApolloClient<any>

    jest.clearAllMocks()
  })

  test('getInstance returns the same instance', () => {
    const instance1 = SymbolMapperService.getInstance(mockApolloClient)
    const instance2 = SymbolMapperService.getInstance(mockApolloClient)

    expect(instance1).toBe(instance2)
  })

  test('getInstrumentIdBySymbol returns correct instrumentId after initialization', async () => {
    const service = SymbolMapperService.getInstance(mockApolloClient)

    // Manually initialize the maps with test data
    service['symbolToIdMap'].set('AAPL', 123)
    service['symbolToIdMap'].set('MSFT', 456)
    service['symbolToIdMap'].set('GOOG', 789)
    service['symbolToIdMap'].set('AMZN', 101)
    service['idToSymbolMap'].set(123, 'AAPL')
    service['idToSymbolMap'].set(456, 'MSFT')
    service['idToSymbolMap'].set(789, 'GOOG')
    service['idToSymbolMap'].set(101, 'AMZN')
    service['initialized'] = true

    const appleId = await service.getInstrumentIdBySymbol('AAPL')
    expect(appleId).toBe(123)

    const msftId = await service.getInstrumentIdBySymbol('MSFT')
    expect(msftId).toBe(456)

    const googleId = await service.getInstrumentIdBySymbol('GOOG')
    expect(googleId).toBe(789)

    const amznId = await service.getInstrumentIdBySymbol('AMZN')
    expect(amznId).toBe(101)
  })

  test('getInstrumentIdBySymbol returns null for unknown symbol', async () => {
    const service = SymbolMapperService.getInstance(mockApolloClient)

    // Manually initialize the maps with test data
    service['symbolToIdMap'].set('AAPL', 123)
    service['initialized'] = true

    const unknownId = await service.getInstrumentIdBySymbol('UNKNOWN')
    expect(unknownId).toBeNull()
  })

  test('getSymbolByInstrumentId returns correct symbol', async () => {
    const service = SymbolMapperService.getInstance(mockApolloClient)

    // Manually initialize the maps with test data
    service['idToSymbolMap'].set(456, 'MSFT')
    service['idToSymbolMap'].set(101, 'AMZN')
    service['initialized'] = true

    const msftSymbol = await service.getSymbolByInstrumentId(456)
    expect(msftSymbol).toBe('MSFT')

    const amznSymbol = await service.getSymbolByInstrumentId(101)
    expect(amznSymbol).toBe('AMZN')
  })

  test('getSymbolByInstrumentId returns null for unknown instrumentId', async () => {
    const service = SymbolMapperService.getInstance(mockApolloClient)

    // Manually initialize the maps with test data
    service['idToSymbolMap'].set(123, 'AAPL')
    service['initialized'] = true

    const unknownSymbol = await service.getSymbolByInstrumentId(999)
    expect(unknownSymbol).toBeNull()
  })

  test('getExchangeBySymbol returns correct exchange', async () => {
    const service = SymbolMapperService.getInstance(mockApolloClient)

    // Manually initialize the maps with test data
    service['symbolToExchangeMap'].set('AAPL', 'NASDAQ')
    service['symbolToExchangeMap'].set('MSFT', 'NYSE')
    service['initialized'] = true

    const appleExchange = await service.getExchangeBySymbol('AAPL')
    expect(appleExchange).toBe('NASDAQ')

    const msftExchange = await service.getExchangeBySymbol('MSFT')
    expect(msftExchange).toBe('NYSE')
  })

  test('getExchangeBySymbol returns null for unknown symbol', async () => {
    const service = SymbolMapperService.getInstance(mockApolloClient)

    // Manually initialize the maps with test data
    service['symbolToExchangeMap'].set('AAPL', 'NASDAQ')
    service['initialized'] = true

    const unknownExchange = await service.getExchangeBySymbol('UNKNOWN')
    expect(unknownExchange).toBeNull()
  })

  test('initializeFromWatchedInstruments adds data to maps', async () => {
    const service = SymbolMapperService.getInstance(mockApolloClient)

    await service['initializeFromWatchedInstruments']()

    expect(service['symbolToIdMap'].get('AAPL')).toBe(123)
    expect(service['symbolToIdMap'].get('MSFT')).toBe(456)
    expect(service['idToSymbolMap'].get(123)).toBe('AAPL')
    expect(service['idToSymbolMap'].get(456)).toBe('MSFT')
    expect(service['symbolToExchangeMap'].get('AAPL')).toBe('NASDAQ')
    expect(service['symbolToExchangeMap'].get('MSFT')).toBe('NYSE')
  })
})
