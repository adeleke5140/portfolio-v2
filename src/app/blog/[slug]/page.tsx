import { components } from '@/components/mdx/mdx-components'
import { PageWrapper } from '@/components/pageWrapper'
import { promises as fs } from 'fs'
import { compileMDX } from 'next-mdx-remote/rsc'
import Head from 'next/head'
import { getBlogData } from '../utils'
import * as fsSync from 'fs'
import path from 'path'

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
            <h1 className="font-clash text-[48px] font-semibold leading-[100%] tracking-[-0.96px]">
              {postData.title}
            </h1>
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
