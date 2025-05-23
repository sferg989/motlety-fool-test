'use server'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import WatchListSkeleton from './loading/watchListSkeleton'

// Dynamically import the client component with no SSR
const WatchList = dynamic(() => import('./watchList'), {
  ssr: false,
  loading: () => <WatchListSkeleton />,
})

export default function WatchListContainer() {
  return (
    <Suspense fallback={<WatchListSkeleton />}>
      <WatchList />
    </Suspense>
  )
}
