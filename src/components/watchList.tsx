'use client'

import useWatchedCompanies from 'src/hooks/useWatchedCompanies'
import {useEffect, useState} from 'react'
import {Instrument} from '~types/quotes'
import WatchButton from './ui/watchButton'
import CompanyLink from './ui/companyLink'

const WatchList = () => {

  const {data} = useWatchedCompanies()
  const watches = data?.instruments || []
  
  return (
    <div style={{ maxHeight: '200px', overflowY: 'auto'}}>
      <table className="table-auto">
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
        {watches.map(watch => (
          <tr key={watch.instrumentId} className="text-center">
            <td className="px-4 py-2">
            <CompanyLink symbol={watch.symbol} />
            </td>
            <td className="px-4 py-2">{watch.name}</td>
            <td className="px-4 py-2"></td>
            <td className="px-4 py-2"></td>
            <td className="px-4 py-2"></td>
            <td className="px-4 py-2">
            <WatchButton 
              instrumentId={watch.instrumentId} 
              includeText={false}
              isCurrentlyWatching={true}
            />
            </td>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  )
}

export default WatchList