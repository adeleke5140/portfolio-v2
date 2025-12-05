'use client'

import { cn } from '@/lib/utils'
import { type ComponentProps, memo, useMemo } from 'react'
import { Streamdown } from 'streamdown'

type ResponseProps = ComponentProps<typeof Streamdown>

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
  ({ className, children, ...props }: ResponseProps) => {
    const components = useMemo(
      () => ({
        // Custom renderer for text nodes to parse colors
        p: (props: React.ComponentPropsWithoutRef<'p'>) => {
          const { children, ...rest } = props
          if (typeof children === 'string') {
            return (
              <p {...rest} className="mb-4">
                <ColorParsedText text={children} />
              </p>
            )
          }
          // Handle array of children
          if (Array.isArray(children)) {
            return (
              <p {...rest} className="mb-4">
                {children.map((child, i) => {
                  if (typeof child === 'string') {
                    return <ColorParsedText key={i} text={child} />
                  }
                  return child
                })}
              </p>
            )
          }
          return (
            <p {...rest} className="mb-4">
              {children}
            </p>
          )
        },
      }),
      []
    )

    return (
      <Streamdown
        className={cn(
          'size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 streamdown',
          className
        )}
        components={components}
        // Custom themes are valid but TypeScript's BundledTheme type only includes built-in themes
        shikiTheme={[customTheme as any, customTheme as any]}
        {...props}
      >
        {children}
      </Streamdown>
    )
  },
  (prevProps, nextProps) => prevProps.children === nextProps.children
)

Response.displayName = 'Response'

// Component to parse and render text with color boxes
const ColorParsedText = ({ text }: { text: string }) => {
  const parts = text.split(/(#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}|rgba?\(.*?\))/)

  return (
    <>
      {parts.map((part, i) => {
        // Check if part is a color
        const isHex = /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(part)
        const isRgb = /^rgba?\(/.test(part)

        if (isHex || isRgb) {
          return (
            <span key={i} className="inline-flex text-xs items-center gap-1">
              {part}
              <span
                className="inline-block size-3 rounded-[2px] border border-black/10"
                style={{ backgroundColor: part }}
              />
            </span>
          )
        }

        return <span key={i}>{part}</span>
      })}
    </>
  )
}
