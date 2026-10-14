import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // twoslash resolves TypeScript lib files dynamically at build time, which the
  // bundler can't trace — it has to stay external to keep that working.
  serverExternalPackages: ['twoslash', '@shikijs/twoslash', 'typescript'],
}

export default nextConfig
