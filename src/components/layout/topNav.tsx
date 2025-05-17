'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import UfoElement from '../ui/ufo_element'

const TopNavClient = () => {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <nav className="flex flex-row my-12 justify-center items-center sm:mx-12 lg:mx-0">
      <div>
        {isHomePage ? (
          <div className="group relative inline-flex items-center justify-center p-8" aria-label="Welcome">
            <UfoElement label="Welcome" />
          </div>
        ) : (
          <Link href="/" className="group relative inline-flex items-center justify-center p-8 hover:-translate-y-1 transition-transform duration-300" aria-label="Home">
            <UfoElement label="Home" />
          </Link>
        )}
      </div>
    </nav>
  )
}

// Server component wrapper
const TopNav = () => {
  return <TopNavClient />
}

export default TopNav
