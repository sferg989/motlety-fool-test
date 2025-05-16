import React from 'react'
import Link from 'next/link'

interface CompanyLinkProps {
  symbol: string
  exchange: string
}

const CompanyLink: React.FC<CompanyLinkProps> = ({ symbol, exchange }) => {
  return (
    <Link
      href={`/company/${exchange}/${symbol}`}
      className="inline-block px-4 py-2 text-cyan-100
      hover:bg-cyan-500 hover:text-black
      transition-all duration-300
      animate-pulse"
    >
      {symbol}
    </Link>
  )
}

export default CompanyLink
