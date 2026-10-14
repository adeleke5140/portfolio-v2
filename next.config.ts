import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Temporary while Astro runs alongside Next: keep Next from treating
  // src/pages (Astro routes and .ts endpoints) as Pages Router routes, and
  // let `astro check` own type-checking for files that import astro:* modules.
  pageExtensions: ['tsx'],
  typescript: { ignoreBuildErrors: true },
  // twoslash resolves TypeScript lib files dynamically at build time, which the
  // bundler can't trace — it has to stay external to keep that working.
  serverExternalPackages: ['twoslash', '@shikijs/twoslash', 'typescript'],
}

export default nextConfig
