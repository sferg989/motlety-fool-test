import {ApolloClient, NormalizedCacheObject} from "@apollo/client"
import {GET_PRODUCTS} from "~data/queries"
import type {Product} from "~types/common"

class ProductsService {
  private client: ApolloClient<NormalizedCacheObject>
  private isFirstLoad: boolean = true

  constructor(apolloClient: ApolloClient<NormalizedCacheObject>) {
    this.client = apolloClient
  }

  async getUserProdcuts(): Promise<Product[]> {
    const delay = this.isFirstLoad ? 1000 : 0
    this.isFirstLoad = false
    return new Promise((resolve) => {
      setTimeout(async () => {
        const { data } = await this.client.query({
          query: GET_PRODUCTS,
        })
        resolve(data.products);
      }, delay)
    })
  }
}

export default ProductsService

