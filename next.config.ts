import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    useCache: true,
  },
  reactStrictMode: true,
  env: {
    //NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
}

export default nextConfig
