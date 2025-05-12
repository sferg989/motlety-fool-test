import Link from 'next/link'

interface CompanyLinkProps {
  symbol: string
}

const CompanyLink: React.FC<CompanyLinkProps> = ({ symbol }) => {
  return (
    <Link 
      href={`/company/${symbol}`}
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