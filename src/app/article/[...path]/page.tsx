import WatchButton from "~components/ui/watchButton"
import ArticlesService from "~data/services/article-service"
import apolloServerClient from "~lib/apollo-server-client"

async function ArticlePage({
  params,
}: {
  params: {path: string}
}) {
  const {path} = params
  const client = await apolloServerClient()
  const articlesService = new ArticlesService(client)
  const article = await articlesService.getArticleByPath(path)

  const recommendedInstrumentId = article.recommendations.length && article.recommendations[0].instrument.instrument_id

  return (
    <div className="bg-gradient-to-r from-black via-slate-900 to-black p-8 font-mono text-slate-300 border-l-4 border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.3)] rounded-r-lg">
      <h1 className="text-3xl font-bold mb-6 flex items-center justify-between">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          {article.headline}
        </span>
        {recommendedInstrumentId && <WatchButton instrumentId={recommendedInstrumentId}/>}
      </h1>
      
      <p className="text-cyan-300 text-lg mb-6 leading-relaxed">
        {article.promo}
      </p>
      
      <p className="text-slate-300 leading-relaxed bg-slate-900/50 p-6 rounded-lg border border-cyan-500/30">
        {article.body}
      </p>
    </div>
  )
}

export default ArticlePage