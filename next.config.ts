import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Ignore README and LICENSE files during bundling
    config.module.rules.push({
      test: /\/(README\.md|LICENSE|CHANGELOG\.md)$/,
      loader: 'ignore-loader',
    })
    
    // Ignore native node modules (.node files)
    config.module.rules.push({
      test: /\.node$/,
      loader: 'node-loader',
    })
    
    // Mark libsql and related packages as external for server-side only
    if (isServer) {
      config.externals = config.externals || []
      config.externals.push('libsql', '@libsql/client')
    }
    
    return config
  },
}

export default nextConfig
