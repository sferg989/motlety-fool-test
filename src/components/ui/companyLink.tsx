import React from 'react'

interface CompanyLinkProps {
  symbol: string
  exchange: string
}

const CompanyLink: React.FC<CompanyLinkProps> = ({ symbol, exchange }) => {
  return (
    <a
      href={`/company/${exchange}/${symbol}`}
      className="inline-block px-4 py-2 text-cyan-100
      hover:bg-cyan-500 hover:text-black
      transition-all duration-300
      animate-pulse"
    >
      {symbol}
    </a>
  )
}

export default CompanyLink
