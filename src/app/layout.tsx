import type { Metadata } from 'next'
import '~styles/globals.css'
import Head from 'next/head'
import Footer from '~components/layout/footer'
import TopNav from '~components/layout/topNav'
import ApolloClientProvider from '~lib/apollo-client-provider'

export const metadata: Metadata = {
  title: 'Next Test Template',
  description: 'Template for Next.js test projects',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ApolloClientProvider>
      <html lang="en">
        <Head>
          <title>Motley UFO</title>
          <link rel="icon" href="/favicon.ico" />
          <meta name="charset" content="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <body className="min-h-screen bg-gradient-to-b from-black via-blue-900 to-black text-blue-100 p-4 sm:p-6 md:p-8">
          <TopNav />
          <div className="w-full my-8 sm:my-10 md:my-12 flex items-center justify-center px-2 sm:px-4">{children}</div>
          <Footer />
        </body>
      </html>
    </ApolloClientProvider>
  )
}
