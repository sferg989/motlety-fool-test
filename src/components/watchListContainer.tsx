'use client'

import dynamic from 'next/dynamic'
import WatchListSkeleton from './loading/watchListSkeleton'

const WatchList = dynamic(() => import('./watchList'), {
  ssr: false,
  loading: () => <WatchListSkeleton />,
})

const WatchListContainer = () => {
  return <WatchList />
}

export default WatchListContainer
