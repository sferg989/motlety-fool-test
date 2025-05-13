'use client'

import { useWatchedCompaniesStore } from '../../store/watchedCompaniesStore'
import { WatchedCompany } from '../../types/company'
import { useState, useEffect } from 'react'

type WatchButtonProps = {
  instrumentId: number
  symbol?: string
  name?: string
  isCurrentlyWatching?: boolean
  includeText?: boolean
}

// Helper function to determine button display properties
const getButtonState = (isWatching: boolean, includeText: boolean) => {
  return {
    text: includeText ? (isWatching ? 'Watching' : 'Watch') : '',
    indicator: isWatching ? '-' : '+',
    textColor: isWatching ? 'text-red-500' : 'text-green-500',
    ariaLabel: isWatching ? 'Unwatch' : 'Watch',
  }
}

const WatchButton = ({ instrumentId, symbol, name, isCurrentlyWatching: propIsWatching, includeText = false }: WatchButtonProps) => {
  const { isWatched, toggleWatchedCompany } = useWatchedCompaniesStore()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const isCurrentlyWatching = propIsWatching !== undefined ? propIsWatching : isMounted ? isWatched(instrumentId) : false

  const { text, indicator, textColor, ariaLabel } = getButtonState(isCurrentlyWatching, includeText)

  const onClick = () => {
    toggleWatchedCompany({
      instrumentId,
      symbol: symbol || '',
      name: name || '',
    })
  }

  return (
    <button onClick={onClick} className="px-8 hover:font-bold" aria-label={ariaLabel}>
      <span className={textColor}>
        {text} {indicator}
      </span>
    </button>
  )
}

export default WatchButton
