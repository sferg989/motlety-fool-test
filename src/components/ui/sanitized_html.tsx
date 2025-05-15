'use client'

import DOMPurify from 'isomorphic-dompurify'
import CompanyLink from './companyLink'
import { Fragment } from 'react'

interface SanitizedHtmlProps {
  html: string
  className?: string
  exchange?: string
  symbol?: string
}

const SanitizedHtml = ({ html, className = '', exchange, symbol }: SanitizedHtmlProps) => {
  const sanitizedHtml = DOMPurify.sanitize(html)

  if (exchange && symbol && sanitizedHtml.includes('(CRYPTO: BTC)')) {
    const parts = sanitizedHtml.split('(CRYPTO: BTC)')

    return (
      <div className={className}>
        {parts.map((part, index) => (
          <Fragment key={index}>
            <span dangerouslySetInnerHTML={{ __html: part }} />
            {index < parts.length - 1 && <CompanyLink exchange={exchange} symbol={symbol} />}
          </Fragment>
        ))}
      </div>
    )
  }

  return <div className={className} dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
}

export default SanitizedHtml
