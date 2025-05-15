'use client'

import DOMPurify from 'isomorphic-dompurify'

interface SanitizedHtmlProps {
  html: string
  className?: string
}

const SanitizedHtml = ({ html, className = '' }: SanitizedHtmlProps) => {
  // Sanitize the HTML content
  const sanitizedHtml = DOMPurify.sanitize(html)

  return <div className={className} dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
}

export default SanitizedHtml
