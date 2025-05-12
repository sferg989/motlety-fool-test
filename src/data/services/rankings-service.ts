import {ApolloClient, NormalizedCacheObject} from "@apollo/client"
import {GET_TOP_RANKINGS} from "~data/queries"
import type {Ranking} from "~types/rankings"

class RankingsService {
  private client: ApolloClient<NormalizedCacheObject>
  private isFirstLoad: boolean = true

  constructor(apolloClient: ApolloClient<NormalizedCacheObject>) {
    this.client = apolloClient
  }

  async getTopRankings(): Promise<Ranking[]> {
    // Simulate a delay on the first load
    const delay = this.isFirstLoad ? 1000 : 0
    this.isFirstLoad = false
    return new Promise((resolve) => {
      setTimeout(async () => {
        const { data } = await this.client.query({
          query: GET_TOP_RANKINGS,
        })
        resolve(data.rankings);
      }, delay)
    })
  }
}

export default RankingsService

