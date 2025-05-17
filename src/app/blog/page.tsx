import { PageWrapper } from '@/components/pageWrapper'
import { formatDate } from '@/helpers/formatDate'
import { getSortedPostsData } from '@/lib/posts'
import Head from 'next/head'
import Link from 'next/link'

const isDevelopment = process.env.NODE_ENV === 'development'

export type Post = {
  id: string
  date?: string
  title?: string
  status?: string
  language?: string
}

const Index = () => {
  const allPostsData = getSortedPostsData() as Array<Post>

  const filteredPosts = allPostsData
    .filter((post) => {
      if (isDevelopment) {
        return post
      } else {
        if (
          post.status !== 'draft' &&
          post.status !== 'editing' &&
          post.status !== 'archived'
        ) {
          return post
        }
      }
    })
    .filter((post) => post.status == 'completed')

  return (
    <>
      <Head>
        <title>Writing</title>
        <link rel="icon" href="/kehinde.ico" />
        <meta name="description" content="Kehinde Adeleke's website" />
        <meta name="og:title" content="Blog" />
      </Head>
      <PageWrapper
        heading="Posts"
        path="/"
        showLink
        showHeading
        backText="home"
      >
        <section className="flex flex-col gap-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="md:grid flex flex-col gap-1 md:items-center grid-cols-[100px,1fr] md:gap-8"
            >
              <span className="text-xs text-gray-700">
                {formatDate(post.date || Date.now().toString())}
              </span>
              <Link href={`/blog/${post.id}`} className="text-sm">
                {post.title}
              </Link>
            </div>
          ))}
        </section>
      </PageWrapper>
    </>
  )
}

export default Index
