'use client'

import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { MockLink } from '@apollo/client/testing'
import mocks from './mock-request-results'
import {ReactNode} from 'react'

const client = new ApolloClient({
  link: new MockLink(mocks),
  cache: new InMemoryCache()
})

interface ApolloClientProviderProps {
  children: ReactNode
}

const ApolloClientProvider = ({ children }: ApolloClientProviderProps) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloClientProvider