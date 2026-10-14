import {
  FinalCodeBlock,
  InitialCodeBlock,
} from '@/app/blog/components/initial-code-block'
import LetterSpacingPlayground from '@/components/islands/LetterSpacingPlayground.astro'
import A from './A.astro'
import Blockquote from './Blockquote.astro'
import Em from './Em.astro'
import H2 from './H2.astro'
import H3 from './H3.astro'
import Li from './Li.astro'
import Ol from './Ol.astro'
import P from './P.astro'
import Strong from './Strong.astro'
import Sup from './Sup.astro'
import Ul from './Ul.astro'

/**
 * Passed to `<Content components={...} />`. MDX files don't import anything;
 * interactive components are `.astro` wrappers in src/components/islands that
 * carry the client:* directive, since MDX can't hydrate injected components.
 */
export const mdxComponents = {
  h2: H2,
  h3: H3,
  p: P,
  ol: Ol,
  ul: Ul,
  li: Li,
  em: Em,
  strong: Strong,
  blockquote: Blockquote,
  sup: Sup,
  a: A,
  LetterSpacingPlayground,
}

export const blogComponents = {
  ...mdxComponents,
  // Server-rendered only: sugar-high runs at build time.
  InitialCodeBlock,
  FinalCodeBlock,
}
