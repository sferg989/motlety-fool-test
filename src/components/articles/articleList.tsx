import type { ArticleListItem } from 'src/types/articles'

type ArticleListProps = {
  articles: ArticleListItem[]
}

const ArticleList = ({ articles }: ArticleListProps) => {
  return (
    <div className="mb-16" data-testid="article-list">
      {articles.map((article) => (
        <div key={article.uuid} className="mb-8">
          <h2 className="text-2xl font-bold">
            <a href={`/article/${article.path}`} className="hover:text-white">
              {article.headline}
            </a>
          </h2>
          <p>{article.promo}</p>
        </div>
      ))}
    </div>
  )
}

export default ArticleList
