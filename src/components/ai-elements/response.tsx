'use client'

import { cn } from '@/lib/utils'
import { type ComponentProps, memo } from 'react'
import { Streamdown } from 'streamdown'

type ResponseProps = ComponentProps<typeof Streamdown>

// Custom theme based on Sugar High colors from globals.css
const customTheme = {
  name: 'custom-sugar-high',
  type: 'light',
  colors: {
    'editor.foreground': '#000000',
    'editor.background': '#f8f8f8',
  },
  tokenColors: [
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: {
        foreground: '#6f6f6f',
      },
    },
    {
      scope: ['keyword', 'storage.type', 'storage.modifier'],
      settings: {
        foreground: '#6f6f6f',
      },
    },
    {
      scope: ['string', 'string.quoted'],
      settings: {
        foreground: '#6f6f6f',
      },
    },
    {
      scope: ['entity.name.function', 'support.function'],
      settings: {
        foreground: '#000000',
      },
    },
    {
      scope: ['entity.name.class', 'entity.name.type', 'support.class'],
      settings: {
        foreground: '#000000',
      },
    },
    {
      scope: ['variable', 'variable.other', 'support.variable'],
      settings: {
        foreground: '#354150',
      },
    },
    {
      scope: ['constant', 'support.constant', 'variable.language'],
      settings: {
        foreground: '#000000',
      },
    },
    {
      scope: ['variable.parameter'],
      settings: {
        foreground: '#000000',
      },
    },
    {
      scope: ['punctuation', 'meta.brace'],
      settings: {
        foreground: '#8f8f8f',
      },
    },
    {
      scope: ['entity.name.tag', 'support.class.component'],
      settings: {
        foreground: '#000000',
      },
    },
    {
      scope: ['entity.other.attribute-name'],
      settings: {
        foreground: '#6f6f6f',
      },
    },
  ],
} as const

export const Response = memo(
  ({ className, ...props }: ResponseProps) => (
    <Streamdown
      className={cn(
        'size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 streamdown',
        className
      )}
      // Custom themes are valid but TypeScript's BundledTheme type only includes built-in themes
      shikiTheme={[customTheme as any, customTheme as any]}
      {...props}
    />
  ),
  (prevProps, nextProps) => prevProps.children === nextProps.children
)

Response.displayName = 'Response'
