import { BlogAssistantWrapper } from '@/components/blog/blog-assistant-wrapper'
import { getSortedPostsData } from '@/lib/posts'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch recent articles on the server
  const posts = getSortedPostsData()
  const recentArticles = posts
    .slice(-10)
    .reverse()
    .map((post) => ({
      id: post.id,
      title: (post as any).title!,
    }))

  return (
    <div>
      {children}
      <BlogAssistantWrapper recentArticles={recentArticles} />
    </div>
  )
}
