/** @type {import('next').NextConfig} */
const nextConfig = {
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
  env: {
    // Expose configuration status to client (not the actual values!)
    NEXT_PUBLIC_SLACK_CONFIGURED: process.env.SLACK_BOT_TOKEN || process.env.SLACK_TOKEN ? 'true' : '',
    NEXT_PUBLIC_LINEAR_CONFIGURED: process.env.LINEAR_API_KEY ? 'true' : '',
  },
}

module.exports = nextConfig
