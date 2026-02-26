import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'
import { LetterSpacingPlayground } from '../letter-spacing-playground'

type HeadingProps = ComponentPropsWithoutRef<'h1'>
type ParagraphProps = ComponentPropsWithoutRef<'p'>
type ListProps = ComponentPropsWithoutRef<'ul'>
type ListItemProps = ComponentPropsWithoutRef<'li'>
type AnchorProps = ComponentPropsWithoutRef<'a'>
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>
type SuperscripttProps = ComponentPropsWithoutRef<'sup'>

export const components = {
  h1: (props: HeadingProps) => (
    <h1 className="font-medium pt-12 text-3xl mb-0" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="text-gray-800 text-2xl font-medium mt-8 mb-3" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <h3 className="text-gray-800 text-xl font-medium mt-8 mb-3" {...props} />
  ),
  h4: (props: HeadingProps) => (
    <h4 className="text-gray-800 mt-8 mb-3 font-medium" {...props} />
  ),
  p: (props: ParagraphProps) => (
    <p className="text-ken-black my-6 leading-[26px]" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol className="text-gray-800 list-decimal pl-5" {...props} />
  ),
  ul: (props: ListProps) => (
    <ul className="text-gray-800 block list-disc pl-5 my-2" {...props} />
  ),
  li: (props: ListItemProps) => (
    <li className="pl-1 my-2 text-[17px]" {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="font-italic" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-medium" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className = 'text-primary underline group-hover:text-primary'
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      )
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      )
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    )
  },
  code: (props: ComponentPropsWithoutRef<'code'>) => {
    return <code {...props} />
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="[&>p]:py-1 [&>p]:pl-4 bg-bb rounded-md rounded-l-none border-l-2 border-primary [&>p]:text-[16px]"
      {...props}
    />
  ),
  sup: ({ className, ...props }: SuperscripttProps) => (
    <sup className={cn('text-pink-500 align-super', className)} {...props} />
  ),
  LetterSpacingPlayground,
}
