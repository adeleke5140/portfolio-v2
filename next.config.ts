import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  serverExternalPackages: ['@mastra/*'],
  outputFileTracingIncludes: {
    '/api/**/*': ['./src/app/blog/posts/**/*'],
  },
}

export default nextConfig
