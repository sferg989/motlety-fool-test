import {useQuery} from '@apollo/client'
import {GET_WATCHED_INSTRUMENTS} from '../data/queries'

let promise = null
let result = null

const useWatchedCompanies = () => {
  const {data, loading, error} = useQuery(GET_WATCHED_INSTRUMENTS)

  if (loading || error) {
    return {data: null, loading, error}
  }

  if (!promise && data) {
    promise = new Promise((resolve) => {
      setTimeout(() => {
        result = data
        resolve(result)
      }, 1000)
    })
  }

  if (promise && !result) {
    throw promise
  }

  return {data: result, loading: false, error}
}

export default useWatchedCompanies