import type { Quote, RealtimeQuotes } from 'src/types/quotes'
import realtimeQuotesData from 'src/data/mocks/realtime-quotes.json'

export const getQuote = (instrumentId: number): Quote => {
  return {
    currentPrice: {
      amount: 5.0,
      currencyCode: 'USD',
    },
    dividendYield: 0.02,
    lastTradeDate: new Date().toISOString(),
    marketCap: {
      amount: 1000000000000,
      currencyCode: 'USD',
    },
    revenueGrowth: 0.2,
    grossMargin: 0.5,
    peRatio: 15,
    beta5y: 1.2,
    percentChange: 0.08,
    priceChange: {
      amount: 9.12
    },
  }
}

export const getRealtimeQuotes = (instrumentIds: number[]): RealtimeQuotes => {
  return realtimeQuotesData
}