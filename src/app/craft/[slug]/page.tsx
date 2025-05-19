import { getBlogPosts } from '@/app/blog/utils'
import { CardAnimation } from '@/components/card-animation/card-animation'
import { CraftContainer } from '@/components/craft-items/craft-container'
import { Tabs } from '@/components/exclusion-tabs/tabs'
import { components } from '@/components/mdx/mdx-components'
import { PageWrapper } from '@/components/pageWrapper'
import { formatDate } from '@/helpers/formatDate'
import { promises as fs } from 'fs'
import { compileMDX } from 'next-mdx-remote/rsc'
import path from 'path'

export async function generateStaticParams() {
  const posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export const dynamicParams = false

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug

  const mdxPath = path.join(
    process.cwd(),
    'src/app/craft/components',
    `${slug}.mdx`
  )

  const content = await fs.readFile(mdxPath, 'utf8')
  const data = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: true,
    },
    components: {
      CraftContainer,
      CardAnimation,
      Tabs,
      ...components,
    },
  })
  const craftFrontMatter = data.frontmatter as { title: string; date: string }
  return (
    <PageWrapper
      heading={
        <div>
          <h1 className="font-sans text-xl font-medium tracking-tighter">
            {craftFrontMatter.title}
          </h1>
          <p className="text-gray-500 text-sm">
            {formatDate(craftFrontMatter.date)}
          </p>
        </div>
      }
      path="/craft"
      backText="to Craft"
      showHeading
      showLink
    >
      {data.content}
    </PageWrapper>
  )
}
