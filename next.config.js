/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    if (dev) {
      config.plugins.push(
        new (require('webpack').WatchIgnorePlugin)({
          paths: [path.join(__dirname, 'src', 'posts')],
        })
      )
    }
    return config
  },
}

module.exports = nextConfig
