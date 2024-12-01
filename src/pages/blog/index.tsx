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
  const Posts = allPostsData.filter((post) => {
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

  return (
    <>
      <Head>
        <title>Writing</title>
        <link rel="icon" href="/kehinde.ico" />
        <meta name="description" content="Kehinde Adeleke's website" />
        <meta name="og:title" content="Blog" />
      </Head>
      <section>
        <section className="">
          <p>Rewriting.</p>
        </section>
      </section>
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
