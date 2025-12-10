import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'
import { highlight } from 'sugar-high'
import { LetterSpacingPlayground } from '../letter-spacing-playground'

type HeadingProps = ComponentPropsWithoutRef<'h1'>
type ParagraphProps = ComponentPropsWithoutRef<'p'>
type ListProps = ComponentPropsWithoutRef<'ul'>
type ListItemProps = ComponentPropsWithoutRef<'li'>
type AnchorProps = ComponentPropsWithoutRef<'a'>
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>

export const components = {
  h1: (props: HeadingProps) => (
    <h1 className="font-medium font-serif  pt-12 text-3xl mb-0" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2
      className="text-gray-800 font-serif text-2xl font-medium mt-8 mb-3"
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className="text-gray-800 font-serif text-xl font-medium mt-8 mb-3"
      {...props}
    />
  ),
  h4: (props: HeadingProps) => (
    <h4 className="font-serif font-medium" {...props} />
  ),
  p: (props: ParagraphProps) => (
    <p className="text-ken-black text-[20px] my-6 leading-[30px]" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol
      className="text-gray-800 dark:text-zinc-300 list-decimal pl-5 space-y-2"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul className="text-gray-800 block list-disc pl-5 my-2" {...props} />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="font-medium" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-medium" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className =
      'text-primary underline group-hover:text-primary dark:text-gray-400 group-hover:dark:text-gray-300 dark:underline dark:underline-offset-2 dark:decoration-gray-800'
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
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const codeHTML = highlight(children as string)
    return (
      <code
        className="font-mono bg-[#ededed] overflow-x-auto rounded-[6px] py-0.5 px-[3.6px] border border-[#e5e7eb] text-xs"
        dangerouslySetInnerHTML={{ __html: codeHTML }}
        {...props}
      />
    )
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
      className="[&>p]:py-1 [&>p]:pl-4 bg-primary/5 rounded-md border-l-2 border-primary [&>p]:text-[16px]"
      {...props}
    />
  ),
  LetterSpacingPlayground,
}
