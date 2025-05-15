import { GET_COMPANY_DATA } from '~data/queries'
import apolloServerClient from '~lib/apollo-server-client'
import { Instrument, Quote, QuoteFundamentals } from '~types/quotes'
import CompanyHeader, { CompanyHeaderProps } from '../../_components/companyHeader'
import CompanyData from '../../_components/companyData'
import Debug from '~components/debug'
import CompanyService from '~data/services/company-service'
import SymbolMapperService from '~data/services/symbol-mapper-service'
import { notFound } from 'next/navigation'

async function CompanyPage({ params }: { params: Promise<{ exchange: string; symbol: string }> }) {
  const { symbol, exchange } = await params
  const client = await apolloServerClient()

  const symbolMapper = SymbolMapperService.getInstance(client)

  const instrumentId = await symbolMapper.getInstrumentIdBySymbol(symbol)
  if (!instrumentId) {
    notFound()
  }

  const companyService = CompanyService.getInstance(client)
  const companyData = await companyService.getCompanyDataByInstrumentId(instrumentId)

  if (!companyData) {
    notFound()
  }

  const headerData: CompanyHeaderProps = {
    instrumentId: companyData.instrumentId,
    symbol: companyData.symbol,
    name: companyData.name,
    currency: companyData.quote.currentPrice.currencyCode,
    price: companyData.quote.currentPrice.amount,
    change: companyData.quote.priceChange.amount,
    lastUpdate: companyData.quote.lastTradeDate,
  }

  return (
    <div>
      <CompanyHeader {...headerData} />
      <CompanyData quote={companyData.quote} quoteFundamentals={companyData.quoteFundamentals} />
    </div>
  )
}

export default CompanyPage
