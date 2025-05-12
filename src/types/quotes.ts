import {QuantScore} from "./common"

export type Instrument = {
  exchange: string
  instrumentId: number
  name: string
  symbol: string
  sector?: string
  quoteHistoricalSummary?: {
    oneYearReturnPercent: number
    fiveYearReturnPercent: number
  }
  quote?: Quote
  quantScore?: QuantScore
  peerInstruments?: PeerInstrument[]
}

export type Quote = {
  currentPrice: {
    amount: number
    currencyCode: string
  }
  dividendYield: number
  lastTradeDate: string
  marketCap: {
    amount: number
    currencyCode: string
  }
  revenueGrowth: number
  grossMargin: number
  peRatio: number
  beta5y: number
  percentChange: number
  priceChange: {
    amount: number
  }
}

export type QuoteHistoricalSummary = {
  fiveYearReturnPercent: number
  sinceIPOReturnPercent: number
  benchmarkFiveYearReturnPercent: number
  benchmarkOneYearReturnPercent: number
  oneYearReturnPercent: number
  fiveYearAnnualizedReturnPercent: number
  benchmarkFiveYearAnnualizedReturnPercent: number
  benchmarkSinceIPOReturnPercent: number
}

export type QuoteFundamentals = {
  dynamic: {
    ceo: {
      data: Array<{ value: string }>
    },
    marketCapPerEmployee: {
      data: Array<{ value: string }>
    },
    website: {
      data: Array<{ value: string }>
    },
    marketCapitalization: {
      data: Array<{ value: string, unit: string }>
    },
    numberOfEmployees: {
      data: Array<{ value: string }>
    }
  }
}

export type RealtimeQuote = {
  current_price: number
  high: number
  low: number
  change: number
  percent_change: number
  currency: string
  last_trade_date: string
}

export type RealtimeQuotes = {
  [key: string]: RealtimeQuote
}