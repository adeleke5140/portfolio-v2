import { getBlogPosts } from '@/app/blog/utils'
import { PageWrapper } from '@/components/pageWrapper'

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

  const { default: Post } = await import(`../components/${slug}.mdx`)

  return (
    <PageWrapper
      heading="Craft"
      path="/craft"
      backText="to Craft"
      showHeading
      showLink
    >
      <Post />
    </PageWrapper>
  )
}
