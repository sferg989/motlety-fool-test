import { useQuery } from '@apollo/client'
import { GET_WATCHED_INSTRUMENTS } from '../data/queries'
import { useWatchedCompaniesStore } from '../store/watchedCompaniesStore'
import { useEffect } from 'react'

// For testing purposes
let promise: Promise<any> | null = null
let result: any | null = null

// Add a way to reset state for tests
if (typeof window !== 'undefined' && (window as any).__RESET_USE_WATCHED_COMPANIES) {
  promise = null
  result = null
  delete (window as any).__RESET_USE_WATCHED_COMPANIES
}

const useWatchedCompanies = () => {
  const { data, loading, error } = useQuery(GET_WATCHED_INSTRUMENTS)

  const { watchedCompanies, isWatched, toggleWatchedCompany, initializeFromApi, hasLocalData } = useWatchedCompaniesStore()

  // Sync API data with Zustand store only if no localStorage data exists
  useEffect(() => {
    if (data?.instruments && !hasLocalData()) {
      initializeFromApi(data.instruments)
    }
  }, [data, initializeFromApi, hasLocalData])

  // For testing
  if (loading || error) {
    return {
      data: null,
      loading,
      error,
      watchedCompanies,
      isWatched,
      toggleWatchedCompany,
    }
  }

  if (!promise && data) {
    promise = new Promise((resolve) => {
      setTimeout(() => {
        result = data
        // Only initialize from API if no local data in tests too
        if (!hasLocalData()) {
          initializeFromApi(data.instruments)
        }
        resolve(result)
      }, 10)
    })
  }

  if (promise && !result) {
    throw promise
  }

  return {
    data: result,
    loading: false,
    error,
    watchedCompanies,
    isWatched,
    toggleWatchedCompany,
  }
}

export default useWatchedCompanies
