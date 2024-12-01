import {
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
} from 'next';
import { getAllPostsIds, getPostData } from '@/lib/posts';
import { ParsedUrlQuery } from 'querystring';
import type { Post } from './index';
import Head from 'next/head';
import { PostWrapper } from '@/components/postWrapper';
import { formatDate } from '@/helpers/formatDate';
import Link from 'next/link';
import { useEffect } from 'react';
import Prism from 'prismjs';
import readingTime from 'reading-time/lib/reading-time';

import { Dot } from 'lucide-react';
require('prismjs/components/prism-jsx');
require('prismjs/components/prism-javascript');
require('prismjs/components/prism-typescript');
require('prismjs/components/prism-elixir');

interface PostData extends Post {
  contentHtml: string;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

const Post = ({
  postData,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const estimatedReadingTime = readingTime(postData.contentHtml);

  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <PostWrapper path="/blog">
        <div className="relative flex justify-between w-full items-center"></div>
        <section className="pb-8 mt-4">
          <div className="">
            <h1 className="font-medium font-serif mb-4 text-xl md:text-2xl">
              {postData.title}.
            </h1>
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-1 text-sm =">
                <span>{formatDate(postData.date!)}</span>
                <Dot />
                <span>{estimatedReadingTime.text}</span>
              </p>
            
            </div>
          </div>
          <section
            className={`mt-12 font-normal prose language-${postData.language}`}
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          ></section>
        </section>
      </PostWrapper>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostsIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ postData: PostData }> = async ({
  params,
}) => {
  const { id } = params as Params;
  const postData = await getPostData(id as string);
  return {
    props: {
      postData,
    },
  };
};

export default Post;
