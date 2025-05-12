import { GET_PRODUCTS, GET_TOP_RANKINGS, GET_ARTICLE_LIST, GET_COMPANY_DATA, GET_WATCHED_INSTRUMENTS } from 'src/data/queries'
import PRODUCT_DATA from 'src/data/mocks/products.json'
import TOP_RANKINGS from 'src/data/mocks/top-rankings.json'
import ARTICLE_LIST from 'src/data/mocks/article-list.json'
import COMPANY_DATA from 'src/data/mocks/company-data.json'
import WATCHED_INSTRUMENTS from 'src/data/mocks/watched-instruments.json'

const mocks = [
  {
    request: {
      query: GET_PRODUCTS,
    },
    result: {
      data: {
        products: PRODUCT_DATA,
      },
    },
  },
  {
    request: {
      query: GET_WATCHED_INSTRUMENTS,
    },
    result: {
      data: {
        instruments: WATCHED_INSTRUMENTS,
      },
    },
  },
  {
    request: {
      query: GET_TOP_RANKINGS,
    },
    result: {
      data: {
        rankings: TOP_RANKINGS,
      },
    },
  },
  {
    request: {
      query: GET_ARTICLE_LIST,
    },
    result: {
      data: {
        articles: ARTICLE_LIST,
      },
    },
  },
  {
    request: {
      query: GET_COMPANY_DATA,
    },
    result: {
      data: {
        instrument: COMPANY_DATA,
      },
    },
  }
]

export default mocks