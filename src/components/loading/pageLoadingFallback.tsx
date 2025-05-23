'use client'

import LoadingSpinner from '../ui/loading_spinner'

interface PageLoadingFallbackProps {
  height?: string
  className?: string
}

export default function PageLoadingFallback({ height = 'h-64', className = '' }: PageLoadingFallbackProps) {
  return (
    <div className={`flex justify-center items-center ${height} ${className}`}>
      <LoadingSpinner size="large" variant="circle" color="text-cyan-400" />
    </div>
  )
}
