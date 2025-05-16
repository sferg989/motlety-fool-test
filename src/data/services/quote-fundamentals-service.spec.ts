import { jest } from '@jest/globals'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import QuoteFundamentalsService from './quote-fundamentals-service'
import { GET_COMPANY_DATA } from '~data/queries'

// Mock queries module
jest.mock('~data/queries', () => ({
  GET_COMPANY_DATA: 'GET_COMPANY_DATA',
}))

describe('QuoteFundamentalsService', () => {
  let mockApolloClient: ApolloClient<NormalizedCacheObject>

  const mockQuoteFundamentals = {
    pe: 20,
    eps: 5,
    dividendYield: 0.02,
    marketCap: 1000000000,
    fiftyTwoWeekHigh: 120,
    fiftyTwoWeekLow: 80,
  }

  beforeEach(() => {
    // Reset singleton instance
    QuoteFundamentalsService.resetInstance()

    // Setup mock Apollo client
    mockApolloClient = {
      query: jest.fn().mockResolvedValue({
        data: {
          instrument: {
            quoteFundamentals: mockQuoteFundamentals,
          },
        },
      } as never),
    } as unknown as ApolloClient<NormalizedCacheObject>
  })

  test('getInstance returns the same instance', () => {
    const instance1 = QuoteFundamentalsService.getInstance(mockApolloClient)
    const instance2 = QuoteFundamentalsService.getInstance(mockApolloClient)

    expect(instance1).toBe(instance2)
  })

  test('getQuoteFundamentals returns correct data', async () => {
    const service = QuoteFundamentalsService.getInstance(mockApolloClient)
    const result = await service.getQuoteFundamentals()

    expect(mockApolloClient.query).toHaveBeenCalledWith({
      query: GET_COMPANY_DATA,
      fetchPolicy: 'cache-first',
      variables: {
        instrumentId: 289026,
      },
    })

    expect(result).toEqual(mockQuoteFundamentals)
  })

  test('getQuoteFundamentals uses cached data on subsequent calls', async () => {
    const service = QuoteFundamentalsService.getInstance(mockApolloClient)

    // First call should fetch data
    await service.getQuoteFundamentals()

    // Reset the mock to verify it's not called again
    ;(mockApolloClient.query as jest.Mock).mockClear()

    // Second call should use cache
    const result = await service.getQuoteFundamentals()

    expect(mockApolloClient.query).not.toHaveBeenCalled()
    expect(result).toEqual(mockQuoteFundamentals)
  })
})
