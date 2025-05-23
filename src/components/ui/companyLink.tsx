'use client'

import React, { useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { revalidateCompanyPath } from '../../app/actions'
import LoadingSpinner from './loading_spinner'

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
          <LoadingSpinner size="small" />
        </span>
      )}
    </Link>
  )
}

export default CompanyLink
