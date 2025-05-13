import { GET_COMPANY_DATA } from '~data/queries'
import apolloServerClient from '~lib/apollo-server-client'
import { Instrument, Quote, QuoteFundamentals } from '~types/quotes'
import CompanyHeader, { CompanyHeaderProps } from '../../_components/companyHeader'
import CompanyData from '../../_components/companyData'

async function CompanyPage({ params }: { params: { exchange: string; symbol: string } }) {
  const { symbol, exchange } = params
  const client = await apolloServerClient()
  const { data: companyData } = await client.query({
    query: GET_COMPANY_DATA,
  })

  const instrumentData = companyData.instrument.instrument as Instrument
  const quoteData = instrumentData.quote as Quote
  const quoteFundamentals = companyData.quoteFundamentals as QuoteFundamentals

  const headerData: CompanyHeaderProps = {
    instrumentId: instrumentData.instrumentId,
    symbol: instrumentData.symbol,
    name: instrumentData.name,
    currency: quoteData.currentPrice.currencyCode,
    price: quoteData.currentPrice.amount,
    change: quoteData.priceChange.amount,
    lastUpdate: quoteData.lastTradeDate,
  }

  return (
    <div>
      <CompanyHeader {...headerData} />
      <CompanyData />
    </div>
  )
}

export default CompanyPage
