'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTransition, useState } from 'react'
import type { ArticleListItem } from 'src/types/articles'
import { revalidateArticlePath } from '../../app/actions'

type ArticleListProps = {
  articles: ArticleListItem[]
}

const ArticleList = ({ articles }: ArticleListProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [loadingArticleId, setLoadingArticleId] = useState<string | null>(null)

  const handleArticleClick = async (e: React.MouseEvent, path: string, uuid: string) => {
    e.preventDefault()
    setLoadingArticleId(uuid)

    startTransition(async () => {
      await revalidateArticlePath(path)
      router.push(`/article/${path}`)
    })
  }

  return (
    <div className="mb-16" data-testid="article-list">
      {articles.map((article) => (
        <div key={article.uuid} className="mb-8">
          <h2 className="text-2xl font-bold">
            <Link
              href={`/article/${article.path}`}
              className="hover:text-white inline-flex items-center relative"
              onClick={(e) => handleArticleClick(e, article.path, article.uuid)}
            >
              {article.headline}
              {isPending && loadingArticleId === article.uuid && (
                <span className="ml-2">
                  <svg className="animate-spin h-4 w-4 text-cyan-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </span>
              )}
            </Link>
          </h2>
          <p>{article.promo}</p>
        </div>
      ))}
    </div>
  )
}

export default ArticleList
