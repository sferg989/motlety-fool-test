import { render, screen } from '@testing-library/react'
import ArticleList from './articleList'
import type { ArticleListItem } from 'src/types/articles'

describe('ArticleList', () => {
  const mockArticles: ArticleListItem[] = [
    {
      uuid: '1',
      headline: 'Test Article 1',
      path: 'test-article-1',
      promo: 'This is test article 1',
      publishAt: '2023-01-01',
      byline: 'Test Author',
      averageRating: 4.5,
      commentCount: 10,
      productId: 123,
      staticPage: false,
      authors: [
        {
          author: {
            authorId: 1,
            byline: 'Test Author',
          },
          primary: true,
        },
      ],
      hasVideo: false,
    },
    {
      uuid: '2',
      headline: 'Test Article 2',
      path: 'test-article-2',
      promo: 'This is test article 2',
      publishAt: '2023-01-02',
      byline: 'Another Author',
      averageRating: 4.0,
      commentCount: 5,
      productId: 124,
      staticPage: false,
      authors: [
        {
          author: {
            authorId: 2,
            byline: 'Another Author',
          },
          primary: true,
        },
      ],
      hasVideo: false,
    },
  ]

  it('renders the component', () => {
    render(<ArticleList articles={mockArticles} />)

    expect(screen.getByText('Test Article 1')).toBeInTheDocument()
    expect(screen.getByText('Test Article 2')).toBeInTheDocument()
  })

  it('renders article promos', () => {
    render(<ArticleList articles={mockArticles} />)

    expect(screen.getByText('This is test article 1')).toBeInTheDocument()
    expect(screen.getByText('This is test article 2')).toBeInTheDocument()
  })

  it('renders the correct number of articles', () => {
    render(<ArticleList articles={mockArticles} />)

    const headings = screen.getAllByRole('heading')
    expect(headings).toHaveLength(2)
  })

  it('renders empty list when no articles are provided', () => {
    render(<ArticleList articles={[]} />)

    const container = screen.getByTestId('article-list')
    expect(container.children).toHaveLength(0)
  })
})
