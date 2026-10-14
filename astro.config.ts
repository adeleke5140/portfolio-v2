import mdx from '@astrojs/mdx'
import { unified } from '@astrojs/markdown-remark'
import react from '@astrojs/react'
import { rendererRich, transformerTwoslash } from '@shikijs/twoslash'
import { defineConfig } from 'astro/config'
import rehypePrettyCode, { type Options } from 'rehype-pretty-code'

const prettyCodeOptions: Options = {
  theme: 'github-light',
  keepBackground: false,
  // Opt-in per fence with ```ts twoslash — runs the compiler at build time so
  // inferred types and errors are real rather than hand-written.
  transformers: [
    transformerTwoslash({
      explicitTrigger: true,
      renderer: rendererRich(),
    }),
  ],
}

export default defineConfig({
  site: 'https://kehinde.xyz',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  // The old Next file-convention OG route.
  redirects: { '/opengraph-image': '/og/home.png' },
  integrations: [react(), mdx()],
  vite: {
    // Native .node binding (OG images); the dev dep optimizer can't bundle it.
    ssr: { external: ['@resvg/resvg-js'] },
    optimizeDeps: { exclude: ['@resvg/resvg-js'] },
  },
  markdown: {
    // rehype-pretty-code does the highlighting, so Astro's Shiki stays off.
    syntaxHighlight: false,
    processor: unified({
      rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
      // next-mdx-remote never converted quotes; keep them straight.
      smartypants: false,
    }),
  },
})
