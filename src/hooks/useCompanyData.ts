import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import apolloServerClient from '../lib/apollo-server-client'
import CompanyService from '../data/services/company-service'
import type { WatchedCompany } from '../types/company'

const useCompanyData = () => {
  const [data, setData] = useState<(WatchedCompany & { quote: any })[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const client = await apolloServerClient()
        const companyService = new CompanyService(client)
        const result = await companyService.getWatchedInstrumentsWithQuotes()
        setData(result)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)))
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return {
    data,
    loading,
    error,
  }
}

export default useCompanyData 