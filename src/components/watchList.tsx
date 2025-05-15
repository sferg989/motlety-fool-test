'use client'

import useWatchedCompanies from 'src/hooks/useWatchedCompanies'
import { useEffect, useState } from 'react'
import WatchButton from './ui/watchButton'
import CompanyLink from './ui/companyLink'
import { useWatchedCompaniesStore } from '../store/watchedCompaniesStore'
import { ApolloClient, NormalizedCacheObject, useApolloClient } from '@apollo/client'
import CompanyService from '../data/services/company-service'
import { formatCurrency, formatPercent } from '../utils/formatters'
import WatchListSkeleton from './loading/watchListSkeleton'

const WatchList = () => {
  const { data, error } = useWatchedCompanies()
  const apolloClient = useApolloClient()
  const { watchedCompanies } = useWatchedCompaniesStore()

  const [companyDataMap, setCompanyDataMap] = useState({})
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [initialLoadComplete, setInitialLoadComplete] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const fetchSingleCompanyData = async (companyService, company) => {
    try {
      return await companyService.getCompanyDataByInstrumentId(company.instrumentId)
    } catch (err) {
      console.error(`Error fetching data for company ${company.instrumentId}:`, err)
      return null
    }
  }

  const buildDataMap = (results) => {
    const dataMap = {}
    results.forEach((result) => {
      if (result.data) {
        dataMap[result.id] = result.data
      }
    })
    return dataMap
  }

  useEffect(() => {
    let isMounted = true

    if (!initialLoadComplete && isMounted) {
      setIsLoading(true)
    }

    const processCompaniesData = (companies, companyService) => {
      return Promise.all(companies.map((company) => fetchSingleCompanyData(companyService, company).then((data) => ({ id: company.instrumentId, data }))))
    }

    const fetchCompanyData = async () => {
      if (!apolloClient || watchedCompanies.length === 0) {
        if (isMounted) {
          setIsLoading(false)
          setInitialLoadComplete(true)
        }
        return
      }

      try {
        const companyService = CompanyService.getInstance(apolloClient as ApolloClient<NormalizedCacheObject>)

        const results = await processCompaniesData(watchedCompanies, companyService)

        if (isMounted) {
          setCompanyDataMap(buildDataMap(results))
          setIsLoading(false)
          setInitialLoadComplete(true)
        }
      } catch (error) {
        console.error('Error fetching company data:', error)
        if (isMounted) {
          setIsLoading(false)
          setInitialLoadComplete(true)
        }
      }
    }

    fetchCompanyData()

    return () => {
      isMounted = false
    }
  }, [watchedCompanies, apolloClient, initialLoadComplete])

  if (!isClient) return null

  if (isLoading) return <WatchListSkeleton />

  if (error) return <div>Error loading watched companies</div>

  if (watchedCompanies.length === 0) {
    return <div className="text-center py-4">No companies are currently being watched.</div>
  }

  return (
    <div className="transition-all duration-300 ease-in-out">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Symbol</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Change</th>
            <th className="px-4 py-2">Change %</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {watchedCompanies.map((company) => {
            const companyData = companyDataMap[company.instrumentId]
            return (
              <tr key={company.instrumentId} className="text-center">
                <td className="px-4 py-2">
                  <CompanyLink symbol={company.symbol || ''} exchange={company.exchange || ''} />
                </td>
                <td className="px-4 py-2">{company.name}</td>
                <td className="px-4 py-2">{companyData?.quote ? formatCurrency(companyData.quote.currentPrice.amount) : '-'}</td>
                <td className="px-4 py-2">{companyData?.quote ? formatCurrency(companyData.quote.priceChange.amount) : '-'}</td>
                <td className="px-4 py-2">{companyData?.quote ? formatPercent(companyData.quote.percentChange, true) : '-'}</td>
                <td className="px-4 py-2">
                  <WatchButton instrumentId={company.instrumentId} symbol={company.symbol} name={company.name} isCurrentlyWatching={true} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default WatchList
