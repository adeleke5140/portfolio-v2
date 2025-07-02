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
      <PageWrapper heading="Blog" path="/" showLink showHeading backText="home">
        <section className="flex flex-col">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="pb-7 hover:bg-gray-100 py-4 transition-colors duration-200 border-b border-b-[#dcdcdc] "
            >
              <div className="flex hover:translate-x-2 flex-col gap-1 transition-transform ">
                <p className="text-xl hover:underline  transition-all">
                  {post.title}
                </p>
                <span className="text-sm text-gray-700">
                  {formatDate(post.date || Date.now().toString())}
                </span>
              </div>
            </Link>
          ))}
        </section>
      </PageWrapper>
    </>
  )
}

export default Index
