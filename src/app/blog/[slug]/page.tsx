import { components } from '@/components/mdx/mdx-components'
import { PageWrapper } from '@/components/page-wrapper'
import { formatDate } from '@/helpers/formatDate'
import * as fsSync from 'fs'
import { promises as fs } from 'fs'
import { compileMDX } from 'next-mdx-remote/rsc'
import Head from 'next/head'
import Link from 'next/link'
import path from 'path'
import {
  FinalCodeBlock,
  InitialCodeBlock,
} from '../components/initial-code-block'
import { getBlogData } from '../utils'
import rehypePrettyCode, { type Options } from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug

  const mdxPath = path.join(process.cwd(), 'src/app/blog/posts', `${slug}.mdx`)
  const mdPath = path.join(process.cwd(), 'src/app/blog/posts', `${slug}.md`)

  const blogPath = fsSync.existsSync(mdxPath) ? mdxPath : mdPath

  try {
    const content = await fs.readFile(blogPath, 'utf8')
    const data = await compileMDX({
      source: content,
      options: {
        parseFrontmatter: true,
      },
    })

    const frontmatter = data.frontmatter as {
      title: string
      date: string
      description?: string
    }
    const { title, description, date } = frontmatter

    return {
      title,
      description: description || `Read ${title} on Kenny's blog`,
      openGraph: {
        title,
        description: description || `Read ${title} on Kenny's blog`,
        type: 'article',
        publishedTime: frontmatter.date,
        url: `https://kehinde.xyz/blog/${slug}`,
        images: [
          {
            url: `/api/og?title=${encodeURIComponent(title)}`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: frontmatter.title,
        description:
          frontmatter.description ||
          `Read ${frontmatter.title} on Kenny's blog`,
      },
    }
  } catch (error) {
    return {
      title: 'Blog Post',
      description: 'A blog post by Kenny',
    }
  }
}

export async function generateStaticParams() {
  const posts = getBlogData()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

const options: Options = {
  theme: 'github-light',
  keepBackground: false,
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug

  const mdxPath = path.join(process.cwd(), 'src/app/blog/posts', `${slug}.mdx`)
  const mdPath = path.join(process.cwd(), 'src/app/blog/posts', `${slug}.md`)

  const blogPath = fsSync.existsSync(mdxPath) ? mdxPath : mdPath

  const content = await fs.readFile(blogPath, 'utf8')
  const data = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrettyCode, options]],
      },
    },
    components: {
      InitialCodeBlock,
      FinalCodeBlock,
      ...components,
    },
  })

  const postData = data.frontmatter as { title: string; date: string }
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <PageWrapper
        showLink
        path="/blog"
        backText="Blog"
        heading={
          <div className="py-10 pt-24 border-b border-[#dcdcdc7e] pb-6">
            <span className="text-ken-grey text-[15px]">
              {formatDate(postData.date, 'LLL d, yyyy')}
            </span>
            <h1
              style={{
                textWrap: 'pretty',
              }}
              className="leading-[1.2em] text-[40px] mt-[5px]  tracking-[-0.96px]"
            >
              {postData.title}
            </h1>
          </div>
        }
        showHeading
        classname="lg:pt-0"
      >
        <div className="mx-auto">{data.content}</div>
      </PageWrapper>
    </>
  )
}
