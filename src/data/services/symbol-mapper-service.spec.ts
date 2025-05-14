import { ApolloClient, InMemoryCache } from '@apollo/client'
import SymbolMapperService from './symbol-mapper-service'
import RankingsService from './rankings-service'

// Mock Apollo's gql
jest.mock('@apollo/client', () => {
  return {
    ApolloClient: jest.fn().mockImplementation(() => {
      return {
        query: jest.fn().mockImplementation(() => {
          return Promise.resolve({
            data: {
              instruments: [
                {
                  instrumentId: 202674,
                  name: 'Marriott International',
                  symbol: 'MAR',
                  exchange: 'NASDAQ',
                },
                {
                  instrumentId: 202679,
                  name: 'Agilent Technologies',
                  symbol: 'A',
                  exchange: 'NYSE',
                },
                {
                  instrumentId: 202700,
                  name: 'Abiomed',
                  symbol: 'ABMD',
                  exchange: 'NASDAQ',
                },
              ],
            },
          })
        }),
      }
    }),
    InMemoryCache: jest.fn(),
    gql: jest.fn().mockImplementation((query) => query),
  }
})

// Mock RankingsService
jest.mock('./rankings-service', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getTopRankings: jest.fn().mockResolvedValue([
        {
          currentRank: { asOfDate: '2024-06-10', value: 1 },
          instrument: {
            instrumentId: 303030,
            name: 'Tesla',
            symbol: 'TSLA',
            exchange: 'NASDAQ',
          },
        },
        {
          currentRank: { asOfDate: '2024-06-10', value: 2 },
          instrument: {
            instrumentId: 303031,
            name: 'Apple',
            symbol: 'AAPL',
            exchange: 'NASDAQ',
          },
        },
      ]),
    }
  })
})

// Mock data/queries.js
jest.mock('~data/queries', () => ({
  GET_WATCHED_INSTRUMENTS: 'GET_WATCHED_INSTRUMENTS',
}), { virtual: true })

// Mock CompanyService
jest.mock('./company-service', () => {
  return {
    getInstance: jest.fn().mockImplementation(() => {
      return {}
    }),
  }
})

describe('SymbolMapperService', () => {
  let symbolMapperService: SymbolMapperService
  
  beforeEach(() => {
    SymbolMapperService.resetInstance()
    const client = new ApolloClient({
      cache: new InMemoryCache(),
    })
    symbolMapperService = SymbolMapperService.getInstance(client)
  })

  it('should be a singleton', () => {
    const client = new ApolloClient({
      cache: new InMemoryCache(),
    })
    
    const instance1 = SymbolMapperService.getInstance(client)
    const instance2 = SymbolMapperService.getInstance(client)
    
    expect(instance1).toBe(instance2)
  })

  it('should properly initialize mapping data from both sources', async () => {
    await symbolMapperService.initialize()
    
    // Test watched instruments data
    const id1 = await symbolMapperService.getInstrumentIdBySymbol('MAR')
    const symbol1 = await symbolMapperService.getSymbolByInstrumentId(202674)
    
    expect(id1).toBe(202674)
    expect(symbol1).toBe('MAR')
    
    // Test top rankings data
    const id2 = await symbolMapperService.getInstrumentIdBySymbol('TSLA')
    const symbol2 = await symbolMapperService.getSymbolByInstrumentId(303030)
    
    expect(id2).toBe(303030)
    expect(symbol2).toBe('TSLA')
  })

  it('should return null for unknown symbol', async () => {
    await symbolMapperService.initialize()
    
    const id = await symbolMapperService.getInstrumentIdBySymbol('UNKNOWN')
    
    expect(id).toBeNull()
  })

  it('should return null for unknown instrumentId', async () => {
    await symbolMapperService.initialize()
    
    const symbol = await symbolMapperService.getSymbolByInstrumentId(99999)
    
    expect(symbol).toBeNull()
  })

  it('should initialize automatically when getInstrumentIdBySymbol is called', async () => {
    // Not initializing explicitly
    const id = await symbolMapperService.getInstrumentIdBySymbol('MAR')
    
    expect(id).toBe(202674)
  })

  it('should initialize automatically when getSymbolByInstrumentId is called', async () => {
    // Not initializing explicitly
    const symbol = await symbolMapperService.getSymbolByInstrumentId(303031)
    
    expect(symbol).toBe('AAPL')
  })
}) 