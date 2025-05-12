import { ApolloClient, InMemoryCache } from '@apollo/client'
import { MockLink } from '@apollo/client/testing'
import mocks from './mock-request-results'

const client = async () => {
  const getClient = () => {
    return new ApolloClient({
      link: new MockLink(mocks),
      cache: new InMemoryCache()
    })
  }
  return {getClient}
}

const apolloServerClient = async () => {
  const rscClient = await client()
  return await rscClient.getClient()
}

export default apolloServerClient
