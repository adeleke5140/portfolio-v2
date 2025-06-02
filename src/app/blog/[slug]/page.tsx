import { components } from '@/components/mdx/mdx-components'
import { PageWrapper } from '@/components/pageWrapper'
import { formatDate } from '@/helpers/formatDate'
import { promises as fs } from 'fs'
import { compileMDX } from 'next-mdx-remote/rsc'
import Head from 'next/head'
import path from 'path'
import type { Post } from '../page'
import { getBlogData } from '../utils'



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
  const mdPath = path.join(process.cwd(), 'src/app/blog/posts', `${slug}.mdx`)

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
