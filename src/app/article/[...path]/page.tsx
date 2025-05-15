import WatchButton from '~components/ui/watchButton'
import ArticlesService from '~data/services/article-service'
import apolloServerClient from '~lib/apollo-server-client'
import SanitizedHtml from '~components/ui/sanitized_html'

async function ArticlePage({ params }: { params: Promise<{ path: string }> }) {
  const { path } = await params
  const client = await apolloServerClient()
  const articlesService = new ArticlesService(client)
  const article = await articlesService.getArticleByPath(path)

  const recommendedInstrument = article.recommendations.length > 0 ? article.recommendations[0].instrument : null
  const recommendedInstrumentId = recommendedInstrument?.instrument_id

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      <div
        className="bg-gradient-to-r from-black via-slate-900 to-black p-4 sm:p-8 font-mono text-slate-300 
        border-l-4 border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.3)] rounded-r-lg overflow-hidden"
      >
        <h1
          className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center 
          sm:justify-between gap-4"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{article.headline}</span>
          {recommendedInstrumentId && (
            <div className="flex-shrink-0">
              <WatchButton instrumentId={recommendedInstrumentId} symbol={recommendedInstrument.symbol} name={recommendedInstrument.company_name} />
            </div>
          )}
        </h1>

        <p className="text-cyan-300 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">{article.promo}</p>

        <SanitizedHtml
          html={article.body}
          className="text-slate-300 leading-relaxed bg-slate-900/50 p-3 sm:p-6 rounded-lg 
            border border-cyan-500/30 overflow-x-auto"
        />
      </div>
    </div>
  )
}

export default ArticlePage
