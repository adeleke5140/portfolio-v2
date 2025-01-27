import { PageWrapper } from '@/components/pageWrapper'
import { formatDate } from '@/helpers/formatDate'
import { getSortedPostsData } from '@/lib/posts'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
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

const Index = ({
  allPostsData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const filteredPosts = allPostsData.filter((post) => {
    if (isDevelopment) {
      return post
    } else {
      if (
        post.status == "published"
      ) {
        return post
      }
    }
  })

  return (
    <>
      <Head>
        <title>Writing</title>
        <link rel="icon" href="/kehinde.ico" />
        <meta name="description" content="Kehinde Adeleke's website" />
        <meta name="og:title" content="Blog" />
      </Head>
      <PageWrapper heading="Posts" path="/" showHeading>
        <section className="flex flex-col gap-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="grid items-center grid-cols-[100px,1fr] gap-8"
            >
              <span className="text-xs text-gray-500">
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

export const getStaticProps: GetStaticProps<{ allPostsData: Post[] }> = () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}

export default Index
