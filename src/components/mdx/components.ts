import {
  FinalCodeBlock,
  InitialCodeBlock,
} from '@/components/initial-code-block'
import CraftContainer from '@/components/CraftContainer.astro'
import { TastyButton } from '@/components/craft/tasty-button'
import BatteryWidget from '@/components/islands/BatteryWidget.astro'
import CardAnimation from '@/components/islands/CardAnimation.astro'
import IntegrationMenu from '@/components/islands/IntegrationMenu.astro'
import LetterSpacingPlayground from '@/components/islands/LetterSpacingPlayground.astro'
import RecaptchaButton from '@/components/islands/RecaptchaButton.astro'
import SplitToEdit from '@/components/islands/SplitToEdit.astro'
import Tabs from '@/components/islands/Tabs.astro'
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

export const craftComponents = {
  ...mdxComponents,
  CraftContainer,
  BatteryWidget,
  CardAnimation,
  IntegrationMenu,
  RecaptchaButton,
  SplitToEdit,
  Tabs,
  // CSS-only (:active), so it ships as static HTML.
  TastyButton,
}
