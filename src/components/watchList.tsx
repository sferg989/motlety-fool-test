/* eslint-disable max-lines */
'use client'
import useWatchedCompanies from 'src/hooks/useWatchedCompanies'
import { useCallback, useEffect, useState } from 'react'
import WatchButton from './ui/watchButton'
import CompanyLink from './ui/companyLink'
import { useWatchedCompaniesStore } from '../store/watchedCompaniesStore'
import { ApolloClient, NormalizedCacheObject, useApolloClient } from '@apollo/client'
import CompanyService from '../data/services/company-service'
import { formatCurrency, formatPercent } from '../utils/formatters'
import WatchListSkeleton from './loading/watchListSkeleton'
import { revalidateByTag } from '../app/actions'
import { REVALIDATION_TAGS } from '../app/constants'

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

  const fetchSingleCompanyData = useCallback(async (companyService, company) => {
    try {
      return await companyService.getCompanyDataByInstrumentId(company.instrumentId)
    } catch (err) {
      console.error(`Error fetching data for company ${company.instrumentId}:`, err)
      return null
    }
  }, [])

  const buildDataMap = useCallback((results) => {
    const dataMap = {}
    results.forEach((result) => {
      if (result.data) {
        dataMap[result.id] = result.data
      }
    })
    return dataMap
  }, [])

  // Refresh data
  const refreshData = useCallback(async () => {
    if (!apolloClient || watchedCompanies.length === 0) return

    setIsLoading(true)

    try {
      // Revalidate watchlist data
      await revalidateByTag(REVALIDATION_TAGS.WATCHLIST)

      const companyService = CompanyService.getInstance(apolloClient as ApolloClient<NormalizedCacheObject>)
      const results = await Promise.all(
        watchedCompanies.map((company) => fetchSingleCompanyData(companyService, company).then((data) => ({ id: company.instrumentId, data }))),
      )

      setCompanyDataMap(buildDataMap(results))
    } catch (error) {
      console.error('Error refreshing company data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [apolloClient, watchedCompanies, fetchSingleCompanyData, buildDataMap])

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

    // Set up auto-refresh every 60 seconds
    const refreshInterval = setInterval(() => {
      if (isMounted) refreshData()
    }, 60000)

    return () => {
      isMounted = false
      clearInterval(refreshInterval)
    }
  }, [watchedCompanies, apolloClient, initialLoadComplete, refreshData, fetchSingleCompanyData, buildDataMap])

  if (!isClient) return null

  if (isLoading && !initialLoadComplete) return <WatchListSkeleton />

  if (error) return <div>Error loading watched companies</div>

  if (watchedCompanies.length === 0) {
    return <div className="text-center py-4">No companies are currently being watched.</div>
  }

  return (
    <div className="transition-all duration-300 ease-in-out">
      <div className="flex justify-end mb-4">
        <button
          onClick={refreshData}
          disabled={isLoading}
          className="px-4 py-2 bg-cyan-500/30 hover:bg-cyan-500/50 text-cyan-100 rounded transition-colors duration-300 disabled:opacity-50"
        >
          {isLoading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>
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
