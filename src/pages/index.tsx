import { Home as HomePage } from "@/components/home";
import { usePostContext } from "@/context/postContext";
import { getSortedPostsData } from "@/lib/posts";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { Post } from "./blog";
import { A11yFooter } from "@/components/a11yFooter";

export default function Home({
  allPostsData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { updatePosts } = usePostContext();
  const completedPosts = allPostsData.filter((post) => {
    if (post.status !== "draft" && post.status !== "editing") {
      return post;
    }
  });
  useEffect(() => {
    updatePosts(completedPosts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Head>
        <title>Kehinde | web engineer</title>
        <meta name="description" content="Kehinde Adeleke's portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/kehinde.ico" />
      </Head>

      <section className="max-w-[50rem] pl-8 sm:ml-[12%] sm:pl-16">
        <HomePage />
        <A11yFooter />
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps<{ allPostsData: Post[] }> = () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
