'use client'

import useWatchedCompanies from 'src/hooks/useWatchedCompanies'
import { useEffect, useState } from 'react'
import { Instrument } from '~types/quotes'
import WatchButton from './ui/watchButton'
import CompanyLink from './ui/companyLink'
import { useWatchedCompaniesStore } from '../store/watchedCompaniesStore'

const WatchList = () => {
  // Get the API data with Apollo
  const { data, loading, error } = useWatchedCompanies()

  // Get the local state from Zustand store
  const { watchedCompanies, hasLocalData } = useWatchedCompaniesStore()

  // Use this state to control rendering after hydration is complete
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // On first server render, return a non-conditional placeholder
  // This ensures server and client initial renders match
  if (!isClient) {
    return <div className="transition-all duration-300 ease-in-out"></div>
  }

  // Now safe to render conditional content after hydration
  if (loading && !hasLocalData()) return <div>Loading watched companies...</div>
  if (error) return <div>Error loading watched companies</div>

  // If no watched companies, show a message
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
          {watchedCompanies.map((company) => (
            <tr key={company.instrumentId} className="text-center">
              <td className="px-4 py-2">
                <CompanyLink symbol={company.symbol || ''} />
              </td>
              <td className="px-4 py-2">{company.name}</td>
              <td className="px-4 py-2">-</td>
              <td className="px-4 py-2">-</td>
              <td className="px-4 py-2">-</td>
              <td className="px-4 py-2">
                <WatchButton instrumentId={company.instrumentId} symbol={company.symbol} name={company.name} isCurrentlyWatching={true} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default WatchList
