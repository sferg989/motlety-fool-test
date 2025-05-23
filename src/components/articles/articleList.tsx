'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTransition, useState } from 'react'
import type { ArticleListItem } from 'src/types/articles'
import { revalidateArticlePath } from '../../app/actions'
import LoadingSpinner from '../ui/loading_spinner'

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
                  <LoadingSpinner size="small" variant="circle" />
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
