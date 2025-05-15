import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { HeaderKeys } from './types/common'

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers)
  headers.set(HeaderKeys.CURRENT_PATH, request.nextUrl.pathname)
  return NextResponse.next({ headers })
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}
