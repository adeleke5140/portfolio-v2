import { formatDate } from '@/helpers/formatDate'
import { getPostData, getSortedPostsData } from '@/lib/posts'
import Head from 'next/head'
import type { Post } from '../page'
import { promises as fs } from 'fs'
import { PageWrapper } from '@/components/pageWrapper'
import { BlogContent } from '../components/blog-content'
import { getBlogData } from '../utils'
import { compileMDX, MDXRemote } from 'next-mdx-remote/rsc'
import { components } from '@/components/mdx/mdx-components'
import path from 'path'

interface PostData extends Post {
  contentHtml: string
}

export async function generateStaticParams() {
  const posts = getBlogData()

  return posts.map((post) => ({
    id: post.slug,
  }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const mdPath = path.join(process.cwd(), 'src/posts', `${id}.md`)

  const content = await fs.readFile(mdPath, 'utf8')
  const data = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: true,
    },
    components: {
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
          <div>
            <h1 className="font-sans text-xl font-medium tracking-tighter">
              {postData.title}.
            </h1>
            <p className="text-gray-500 text-sm">
              {formatDate(postData.date!)}
            </p>
          </div>
        }
        path="/blog"
        backText="to blog"
        showHeading
        showLink
      >
        {data.content}
      </PageWrapper>
    </>
  )
}
