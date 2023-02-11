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
interface PostData extends Post {
  contentHtml: string;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

const Post = ({
  postData,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <PostWrapper path="/blog">
        <section className="pb-8 mt-4">
          <div className="font-erode">
            <h1 className="font-extrabold mb-4 text-5xl">{postData.title}.</h1>
            <p className="text-link-color">{formatDate(postData.date!)}</p>
          </div>
          <section
            className="mt-12 font-satoshi prose"
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
