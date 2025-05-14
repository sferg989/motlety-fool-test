import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { GET_COMPANY_DATA } from '~data/queries'
import type { QuoteFundamentals } from '~types/quotes'

class QuoteFundamentalsService {
  private static instance: QuoteFundamentalsService | null = null;
  private client: ApolloClient<NormalizedCacheObject>
  private cachedFundamentals: QuoteFundamentals | null = null;
  
  private constructor(apolloClient: ApolloClient<NormalizedCacheObject>) {
    this.client = apolloClient
  }

  public static getInstance(apolloClient: ApolloClient<NormalizedCacheObject>): QuoteFundamentalsService {
    if (!QuoteFundamentalsService.instance) {
      QuoteFundamentalsService.instance = new QuoteFundamentalsService(apolloClient);
    }
    return QuoteFundamentalsService.instance;
  }

  public static resetInstance(): void {
    QuoteFundamentalsService.instance = null;
  }

  async getQuoteFundamentals(): Promise<QuoteFundamentals> {
    // Return cached data if it exists
    if (this.cachedFundamentals) {
      return this.cachedFundamentals;
    }

    const { data: companyData } = await this.client.query({
      query: GET_COMPANY_DATA,
      fetchPolicy: 'cache-first', // Use cache if available, else fetch from network
    })
    console.log('companyData TESTING', companyData) 
    this.cachedFundamentals = companyData.instrument.instrument.quoteFundamentals as QuoteFundamentals;
    return this.cachedFundamentals;
  }
}

export default QuoteFundamentalsService 