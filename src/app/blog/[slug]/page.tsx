import { components } from '@/components/mdx/mdx-components'
import { PageWrapper } from '@/components/page-wrapper'
import { promises as fs } from 'fs'
import { compileMDX } from 'next-mdx-remote/rsc'
import Head from 'next/head'
import { getBlogData } from '../utils'
import * as fsSync from 'fs'
import path from 'path'
import { formatDate } from '@/helpers/formatDate'
import {
  FinalCodeBlock,
  InitialCodeBlock,
} from '../components/initial-code-block'
import { getPostData } from '@/lib/posts'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug

  const mdxPath = path.join(process.cwd(), 'src/app/blog/posts', `${slug}.mdx`)
  const mdPath = path.join(process.cwd(), 'src/app/blog/posts', `${slug}.md`)

  const blogPath = fsSync.existsSync(mdxPath) ? mdxPath : mdPath

  const data = await getPostData(slug)

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

    return {
      title: frontmatter.title,
      description:
        frontmatter.description || `Read ${frontmatter.title} on Kenny's blog`,
      openGraph: {
        title: frontmatter.title,
        description:
          frontmatter.description ||
          `Read ${frontmatter.title} on Kenny's blog`,
        type: 'article',
        publishedTime: frontmatter.date,
        url: `https://kehinde.xyz/blog/${slug}`,
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
        heading={
          <div className="border-b-[0.5px] py-6  border-b-[#dcdcdc]">
            <h1
              style={{
                textWrap: 'pretty',
              }}
              className="font-serif  py-8  leading-[1.2em] capitalize text-[48px] lg:text-7xl font-medium  lg:tracking-[-.06em] tracking-[-0.96px]"
            >
              {postData.title}
            </h1>

            <span className="text-sm text-gray-700 mt-4 inline-block">
              {formatDate(postData.date || Date.now().toString())}
            </span>
          </div>
        }
        showHeading
        classname="max-w-none lg:pt-0"
      >
        <div className="max-w-[40rem] pt-8 mx-auto">{data.content}</div>
      </PageWrapper>
    </>
  )
}
