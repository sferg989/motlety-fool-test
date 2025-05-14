import { ApolloClient, InMemoryCache } from '@apollo/client'
import CompanyService from './company-service'

// Mock the Apollo client
jest.mock('@apollo/client', () => {
  return {
    ApolloClient: jest.fn().mockImplementation(() => {
      return {
        query: jest.fn().mockImplementation((options) => {
          if (options.query.definitions[0].name.value === 'GetWatchedInstruments') {
            return Promise.resolve({
              data: {
                instruments: [
                  {
                    instrumentId: 202674,
                    name: 'Marriott International',
                    symbol: 'MAR',
                    exchange: 'NASDAQ',
                  },
                ],
              },
            })
          } else if (options.query.definitions[0].name.value === 'GetTopRankings') {
            return Promise.resolve({
              data: {
                rankings: [
                  {
                    currentRank: { asOfDate: '2024-10-21', value: 1 },
                    instrument: {
                      instrumentId: 202674,
                      name: 'Marriott International',
                      symbol: 'MAR',
                      exchange: 'NASDAQ',
                    },
                  },
                ],
              },
            })
          }
          return Promise.resolve({ data: {} })
        }),
      }
    }),
    InMemoryCache: jest.fn(),
  }
})

// Mock rankings service
jest.mock('./rankings-service', () => {
  return jest.fn().mockImplementation(() => ({
    getTopRankings: jest.fn().mockResolvedValue([
      {
        currentRank: { asOfDate: '2024-10-21', value: 1 },
        instrument: {
          instrumentId: 202674,
          name: 'Marriott International',
          symbol: 'MAR',
          exchange: 'NASDAQ',
        },
      }
    ])
  }))
})

// Mock quotes service
jest.mock('./quotes-service', () => ({
  getRealtimeQuotes: jest.fn().mockImplementation(() => ({
    '202674': {
      current_price: 1000,
      high: 1100,
      low: 900,
      change: 50,
      percent_change: 0.05,
      currency: 'USD',
      last_trade_date: '2024-10-30',
    },
  })),
}))

describe('CompanyService', () => {
  let companyService: CompanyService
  let mockClient: ApolloClient<any>

  beforeEach(() => {
    mockClient = new ApolloClient({
      cache: new InMemoryCache()
    })
    companyService = new CompanyService(mockClient)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should get all company data', async () => {
    const result = await companyService.getAllCompanyData()
    
    expect(result).toHaveLength(1)
    expect(result[0].instrumentId).toBe(202674)
    expect(result[0].name).toBe('Marriott International')
    expect(result[0].quote?.currentPrice.amount).toBe(1000)
  })

  it('should get company data by instrument ID', async () => {
    const result = await companyService.getCompanyDataByInstrumentId(202674)
    
    expect(result).toBeDefined()
    expect(result?.instrumentId).toBe(202674)
  })

  it('should return null for non-existing instrument ID', async () => {
    const result = await companyService.getCompanyDataByInstrumentId(999999)
    
    expect(result).toBeNull()
  })

  it('should get watched instruments with realtime quotes', async () => {
    const result = await companyService.getWatchedInstrumentsWithQuotes()
    
    expect(result).toHaveLength(1)
    expect(result[0].instrumentId).toBe(202674)
    expect(result[0].quote.currentPrice.amount).toBe(1000)
  })

  it('should get top rankings with company data', async () => {
    const result = await companyService.getTopRankingsWithCompanyData()
    
    expect(result).toHaveLength(1)
    expect(result[0].currentRank.value).toBe(1)
    expect(result[0].instrument.instrumentId).toBe(202674)
  })
})