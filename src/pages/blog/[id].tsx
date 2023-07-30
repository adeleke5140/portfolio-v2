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
import { useEffect, useRef } from "react";
import Prism from "prismjs";
import readingTime from "reading-time/lib/reading-time";
import { CommandMenu } from "@/components/commandMenu";
import { Dot, Undo2 } from "lucide-react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <PostWrapper path="/blog">
        <div ref={containerRef} className="relative flex justify-between w-full items-center">
          <Link
            href={"/blog"}
            aria-label="home"
            className="font-serif font-[300] italic text-[17px] block w-fit rounded p-1 flex items-center gap-2 "
          >
            <Undo2 size={12} />
            Back
          </Link>
        </div>
        <section className="pb-8 mt-4">
          <div className="">
            <h1 className="font-bold mb-4 text-xl md:text-4xl">{postData.title}.</h1>
            <p
              className="flex items-center gap-1 text-sm text-ken-grey"
            >
              <span>{formatDate(postData.date!)}</span>
              <Dot />
              <span>{estimatedReadingTime.text}</span>
            </p>
          </div>
          <section
            className={`mt-12 text-ken-primary font-normal prose language-${postData.language}`}
            dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
          ></section>
        </section>
        <CommandMenu container={containerRef} />
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
