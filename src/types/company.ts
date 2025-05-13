export type PeerInstrument = {
  instrumentId: number
  name: string
  symbol: string
  quote: {
    currentPrice: {
      amount: number
      currencyCode: string
    }
    priceChange: {
      amount: number
      currencyCode: string
    }
  }
}

export interface WatchedCompany {
  instrumentId: number
  symbol: string
  name: string
  exchange?: string
  id?: number
}
