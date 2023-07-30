import { PageWrapper } from "@/components/pageWrapper";
import { formatDate } from "@/helpers/formatDate";
import { getSortedPostsData } from "@/lib/posts";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";

export type Post = {
  id: string;
  date?: string;
  title?: string;
  status?: string;
  language?: string;
};

const Index = ({
  allPostsData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const completedPosts = allPostsData.filter(post => {
    if (post.status !== "draft" && post.status !== "editing") {
      return post
    }
  })

  return (
    <>
      <Head>
        <title>Kehinde | Blog </title>
        <link rel="icon" href="/kehinde.ico" />
        <meta name="description" content="Kehinde Adeleke's website" />
        <meta name="og:title" content="Blog" />
      </Head>
      <PageWrapper heading="Blog." path="/">
        <p className="font-bold font-mono mb-4 ">I write things.</p>
        <section className="font-mono">
          <ul>
            {completedPosts.map(({ id, date, title }) => (
              <li key={id} className="mb-4">
                <Link
                  className="text-sm inline-block md:transition-transform ease-out duration-200 md:hover:text-link-color"
                  href={`/blog/${id}`}
                >
                  {title}{" "}
                </Link>
                <br />
                <span className="text-gray-500 text-xs">
                  {formatDate(date!)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </PageWrapper>
    </>
  );
};

export const getStaticProps: GetStaticProps<{ allPostsData: Post[] }> = () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

export default Index;
