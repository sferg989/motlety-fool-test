import {ApolloClient, NormalizedCacheObject} from "@apollo/client"
import {GET_ARTICLE_LIST} from "~data/queries"
import {ArticleDetail, ArticleListItem} from "~types/articles"
import articleDetail from 'src/data/mocks/article-detail.json'

class ArticlesService {
  private client: ApolloClient<NormalizedCacheObject>
  private isFirstLoad: boolean = true

  constructor(apolloClient: ApolloClient<NormalizedCacheObject>) {
    this.client = apolloClient
  }

  async getLatestArticles(): Promise<ArticleListItem[]> {
    const delay = this.isFirstLoad ? 1000 : 0
    return new Promise((resolve) => {
      this.isFirstLoad = false
      setTimeout(async () => {
        const { data } = await this.client.query({
          query: GET_ARTICLE_LIST,
        })
        resolve(data.articles)
      }, delay)
    })
  }

  async getArticleByPath(path: string): Promise<ArticleDetail> {
    return new Promise((resolve) => {
      resolve(articleDetail)
    })
  }
}

export default ArticlesService

