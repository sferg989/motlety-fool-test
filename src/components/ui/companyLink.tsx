'use client'

import React, { useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { revalidateCompanyPath } from '../../app/actions'

interface CompanyLinkProps {
  symbol: string
  exchange: string
}

const CompanyLink: React.FC<CompanyLinkProps> = ({ symbol, exchange }) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()

    startTransition(async () => {
      await revalidateCompanyPath(exchange, symbol)
      router.push(`/company/${exchange}/${symbol}`)
    })
  }

  return (
    <Link
      href={`/company/${exchange}/${symbol}`}
      onClick={handleClick}
      className="inline-block px-4 py-2 text-cyan-100
      hover:bg-cyan-500 hover:text-black
      transition-all duration-300
      animate-pulse relative"
    >
      {symbol}
      {isPending && (
        <span className="absolute inset-0 flex items-center justify-center">
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
  )
}

export default CompanyLink
