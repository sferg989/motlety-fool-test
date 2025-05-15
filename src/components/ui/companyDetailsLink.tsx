'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import SymbolMapperService from '~data/services/symbol-mapper-service'
import { useApolloClient, ApolloClient, NormalizedCacheObject } from '@apollo/client'

interface CompanyDetailsLinkProps {
  instrumentId: number
  className?: string
  children?: React.ReactNode
}

const CompanyDetailsLink: React.FC<CompanyDetailsLinkProps> = ({ instrumentId, className = '', children }) => {
  const [linkData, setLinkData] = useState<{ symbol: string; exchange: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const apolloClient = useApolloClient() as ApolloClient<NormalizedCacheObject>

  useEffect(() => {
    const loadLinkData = async () => {
      try {
        setIsLoading(true)
        const symbolMapper = SymbolMapperService.getInstance(apolloClient)
        const symbol = await symbolMapper.getSymbolByInstrumentId(instrumentId)
        const exchange = await symbolMapper.getExchangeBySymbol(symbol)

        if (symbol) {
          setLinkData({ symbol, exchange })
        }
      } catch (error) {
        console.error('Error loading company link data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadLinkData()
  }, [instrumentId, apolloClient])

  if (isLoading) {
    return <span className={`${className} opacity-50`}>Loading...</span>
  }

  if (!linkData) {
    return <span className={`${className} text-red-500`}>Unknown company</span>
  }

  return (
    <Link
      href={`/company/${linkData.exchange}/${linkData.symbol}`}
      className={className || 'inline-block px-4 py-2 text-cyan-100 hover:bg-cyan-500 hover:text-black transition-all duration-300'}
    >
      {children || linkData.symbol}
    </Link>
  )
}

export default CompanyDetailsLink
