
import apolloServerClient from 'src/lib/apollo-server-client'
import RankingsService from '~data/services/rankings-service'
import ArticlesService from '~data/services/article-service'
import ArticleList from '~components/articles/articleList'
import WatchList from '~components/watchList'
import Rankings from '~components/rankingsTable'
import ProductsService from '~data/services/products-service'

export default async function Home() {
  const client = await apolloServerClient()
  const productsService = new ProductsService(client)
  const rankingsService = new RankingsService(client)
  const articlesService = new ArticlesService(client)

  const userProducts = await productsService.getUserProdcuts()
  const topRankings  = await rankingsService.getTopRankings()
  const latestArticles = await articlesService.getLatestArticles()

  return (
    <main>
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 to-blue-700">
          The Motley UFO
        </h1>
        <p className="text-lg text-cyan-300 mt-2 tracking-wide">
          Finding Stocks with Extraterrestrial Influence
        </p>
      </div>

      <div>
        <div className="backdrop-blur-sm bg-blue-900/20 rounded-lg p-6 border border-cyan-500/30 shadow-lg shadow-cyan-500/20 mb-12">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4 tracking-wide">
            Watching for Suspicious Behavior:
          </h2>
          <WatchList />
        </div>

        <div className="backdrop-blur-sm bg-blue-900/20 rounded-lg p-6 border border-cyan-500/30 shadow-lg shadow-cyan-500/20 mb-12">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4 tracking-wide">
            Top Suspicious Companies:
          </h2>
          <Rankings rankings={topRankings} />
        </div>
      </div>

      <div className="backdrop-blur-sm bg-blue-900/20 rounded-lg p-6 border border-cyan-500/30 shadow-lg shadow-cyan-500/20">
        <h2 className="text-2xl font-semibold text-cyan-400 mb-4 tracking-wide">
          Latest Articles:
        </h2>
        <ArticleList articles={latestArticles} />
      </div>
    </main>
  )
}
