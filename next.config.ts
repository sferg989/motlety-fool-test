import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    useCache: true,
    ppr: true,
    serverActions: {
      allowedOrigins: ['localhost:3010'],
    },
    optimizePackageImports: ['react', '@apollo/client'],
  },
  reactStrictMode: true,
  env: {
    //NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
}

export default nextConfig
