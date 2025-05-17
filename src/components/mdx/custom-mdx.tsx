import Link from 'next/link'
import Image, { ImageProps } from 'next/image'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import { codeToHtml } from 'shiki'
import React, { ReactNode } from 'react'

function Table({ data }: { data: { headers: []; rows: Array<[]> } }) {
  const headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function CustomLink(
  props: React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > & { children: ReactNode }
) {
  const href = props.href as string

  if (href.startsWith('/')) {
    return (
      <Link {...props} href={href}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props: ImageProps) {
  return <Image className="rounded-lg" {...props} alt={props.alt} />
}

function Video({ src }: { src: string }) {
  return (
    <video
      className="w-full rounded-lg"
      controls
      playsInline
      preload="metadata"
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

async function Code({
  children,
  ...props
}: {
  children: string
  className?: string
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) {
  const lang = props.className?.replace(/language-/, '') || 'plaintext'

  const codeHTML = await codeToHtml(children, {
    lang,
    theme: 'catppuccin-macchiato',
  })

  const codeMatch = codeHTML.match(/<code[^>]*>([\s\S]*)<\/code>/)
  const innerCodeHTML = codeMatch ? codeMatch[1] : ''

  return <code dangerouslySetInnerHTML={{ __html: innerCodeHTML }} {...props} />
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: string }) => {
    const slug = slugify(children)
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

export const newComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
  Video,
} as unknown as MDXRemoteProps['components']

export function CustomMDX(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...newComponents, ...(props.components || {}) }}
    />
  )
}
