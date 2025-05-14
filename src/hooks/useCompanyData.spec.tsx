import { renderHook, act, waitFor } from '@testing-library/react'
import useCompanyData from './useCompanyData'
import CompanyService from '../data/services/company-service'

// Mock apollo server client
jest.mock('../lib/apollo-server-client', () => {
  return jest.fn().mockResolvedValue({})
})

// Mock company service
jest.mock('../data/services/company-service', () => {
  return jest.fn().mockImplementation(() => ({
    getWatchedInstrumentsWithQuotes: jest.fn().mockImplementation(() => {
      return Promise.resolve([
        {
          instrumentId: 202674,
          name: 'Marriott International',
          symbol: 'MAR',
          exchange: 'NASDAQ',
          quote: {
            currentPrice: {
              amount: 1000,
              currencyCode: 'USD',
            },
            priceChange: {
              amount: 50,
            },
            percentChange: 0.05,
            lastTradeDate: '2024-10-30',
          }
        },
        {
          instrumentId: 202679,
          name: 'Agilent Technologies',
          symbol: 'A',
          exchange: 'NYSE',
          quote: {
            currentPrice: {
              amount: 500,
              currencyCode: 'USD',
            },
            priceChange: {
              amount: 25,
            },
            percentChange: 0.05,
            lastTradeDate: '2024-10-30',
          }
        }
      ])
    })
  }))
})

describe('useCompanyData', () => {
  it('should return watched companies with realtime quotes', async () => {
    const { result } = renderHook(() => useCompanyData())

    // Initial state - loading
    expect(result.current.loading).toBe(true)
    expect(result.current.data).toEqual([])

    // Wait for the async effect to complete
    await waitFor(() => expect(result.current.loading).toBe(false))

    // Should have data now
    expect(result.current.data).toHaveLength(2)
    
    // Check first company
    expect(result.current.data[0].instrumentId).toBe(202674)
    expect(result.current.data[0].symbol).toBe('MAR')
    expect(result.current.data[0].quote.currentPrice.amount).toBe(1000)
    
    // Check second company
    expect(result.current.data[1].instrumentId).toBe(202679)
    expect(result.current.data[1].symbol).toBe('A')
    expect(result.current.data[1].quote.currentPrice.amount).toBe(500)
  })

  it('should handle error state', async () => {
    // Mock implementation that throws an error
    CompanyService.prototype.getWatchedInstrumentsWithQuotes = jest.fn().mockRejectedValue(
      new Error('An error occurred')
    )
    
    const { result } = renderHook(() => useCompanyData())

    // Initial state - loading
    expect(result.current.loading).toBe(true)

    // Wait for the async effect to error
    await waitFor(() => expect(result.current.loading).toBe(false))

    // Should have error now
    expect(result.current.error).toBeDefined()
    expect(result.current.data).toEqual([])
  })
}) 