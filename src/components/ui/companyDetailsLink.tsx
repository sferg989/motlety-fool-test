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

const CompanyDetailsLink: React.FC<CompanyDetailsLinkProps> = ({ 
  instrumentId, 
  className = '', 
  children 
}) => {
  const [linkData, setLinkData] = useState<{ symbol: string, exchange: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const apolloClient = useApolloClient() as ApolloClient<NormalizedCacheObject>

  useEffect(() => {
    const loadLinkData = async () => {
      try {
        setIsLoading(true)
        const symbolMapper = SymbolMapperService.getInstance(apolloClient)
        const symbol = await symbolMapper.getSymbolByInstrumentId(instrumentId)
        
        if (symbol) {
          // For now we'll hardcode NASDAQ as exchange, but in real app you'd get this from data
          // This is just a demonstration of using the mapper service
          setLinkData({ symbol, exchange: 'NASDAQ' })
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