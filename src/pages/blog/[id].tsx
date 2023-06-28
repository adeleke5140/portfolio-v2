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

require("prismjs/components/prism-jsx");
require("prismjs/components/prism-javascript");
require("prismjs/components/prism-typescript")
require("prismjs/components/prism-elixir")
interface PostData extends Post {
  contentHtml: string;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

const Post = ({
  postData,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <PostWrapper path="/blog">
        <div className="text-button-text">
          <Link
            href={"/"}
            aria-label="home"
            className="block w-fit rounded p-2 hover:bg-button-bg transition-colors ease-out duration-200"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
        <section className="pb-8 mt-4">
          <div className="font-erode">
            <h1 className="font-extrabold mb-4 text-5xl">{postData.title}.</h1>
            <p className="text-link-color">{formatDate(postData.date!)}</p>
          </div>
          <section
            className={`mt-12 font-satoshi prose language-${postData.language}`}
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
