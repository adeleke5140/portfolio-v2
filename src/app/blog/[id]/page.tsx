import { formatDate } from '@/helpers/formatDate'
import { getPostData } from '@/lib/posts'
import Head from 'next/head'
import type { Post } from '../page'

import { PageWrapper } from '@/components/pageWrapper'
import { BlogContent } from '../components/blog-content'

interface PostData extends Post {
  contentHtml: string
}

const Post = async ({ params }: { params: { id: string } }) => {
  const { id } = params
  const postData = (await getPostData(id as string)) as PostData

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
        <BlogContent
          contentHtml={postData.contentHtml}
          language={postData.language as string}
        />
      </PageWrapper>
    </>
  )
}

export default Post
