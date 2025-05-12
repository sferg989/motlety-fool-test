type PeerInstrument = {
  instrumentId: number;
  name: string;
  symbol: string;
  quote: {
    currentPrice: {
      amount: number;
      currencyCode: string;
    };
    priceChange: {
      amount: number;
      currencyCode: string;
    };
  };
};