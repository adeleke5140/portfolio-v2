import { formatDate } from '@/helpers/formatDate'
import { getAllPostsIds, getPostData } from '@/lib/posts'
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
} from 'next'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'
import type { Post } from './index'

import { PageWrapper } from '@/components/pageWrapper'
import { useEffect } from 'react'
import Prism from 'prismjs'

require('prismjs/components/prism-javascript')
require('prismjs/components/prism-typescript')

interface PostData extends Post {
  contentHtml: string
}

interface Params extends ParsedUrlQuery {
  id: string
}

const Post = ({
  postData,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <PageWrapper
        heading={
          <div>
            <h1 className="font-semibold font-sans text-2xl">
              {postData.title}.
            </h1>
            <p className="text-gray-700 text-sm">
              {formatDate(postData.date!)}
            </p>
          </div>
        }
        path="/blog"
        backText="to blog"
        showHeading
        showLink
      >
        <section
          className={`mt-10 font-sans selection:bg-[#dfdad9] font-normal prose language-${postData.language}`}
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        ></section>
      </PageWrapper>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostsIds()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{ postData: PostData }> = async ({
  params,
}) => {
  const { id } = params as Params
  const postData = await getPostData(id as string)
  return {
    props: {
      postData,
    },
  }
}

export default Post
