import {
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
} from "next";
import { getAllPostsIds, getPostData } from "@/lib/posts";
import { ParsedUrlQuery } from "querystring";
import type { Post } from "./index";
import Head from "next/head";
import { PostWrapper } from "@/components/postWrapper";
import { formatDate } from "@/helpers/formatDate";
import Link from "next/link";
import { useEffect } from "react";
import Prism from "prismjs";
import readingTime from "reading-time/lib/reading-time";
require("prismjs/components/prism-jsx");
require("prismjs/components/prism-javascript");
require("prismjs/components/prism-typescript");
require("prismjs/components/prism-elixir");


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
        <div className="text-button-text flex flex-row-reverse justify-between w-full items-center">
          <Link
            href={"/"}
            className="font-medium font-mono block w-fit rounded p-1 hover:bg-button-bg transition-colors ease-out duration-150"
          >
            home
          </Link>
          <Link
            href={"/blog"}
            aria-label="home"
            className="block w-fit rounded p-1 hover:bg-button-bg transition-colors ease-out duration-150"
          >
            <p className="text-sm font-mono">../</p>
          </Link>
        </div>
        <section className="pb-8 mt-4">
          <div className="font-erode">
            <h1 className="font-extrabold mb-4 text-5xl font-mono">{postData.title}.</h1>
            <p
              className="text-link-color text-xs flex gap-2 font-mono"
            >
              <span>{formatDate(postData.date!)}</span>.
              <span>{estimatedReadingTime.text}</span>
            </p>
          </div>
          <section
            className={`mt-12 font-mono text-base prose language-${postData.language}`}
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
