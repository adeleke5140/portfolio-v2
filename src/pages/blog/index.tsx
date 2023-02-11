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
};
const Index = ({
  allPostsData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Kehinde | Blog </title>
        <link rel="icon" href="/kehinde.ico" />
        <meta name="description" content="Kehinde Adeleke's website" />
        <meta name="og:title" content="Blog" />
      </Head>
      <PageWrapper heading="Blog." path="/">
        <p className="text-lg font-erode font-bold mb-4">
          A couple of my writings:{" "}
        </p>
        <section className="font-erode">
          <ul>
            {allPostsData.map(({ id, date, title }) => (
              <li key={id} className="mb-2 font-satoshi">
                <Link className="text-sm" href={`/blog/${id}`}>
                  {title}
                </Link>
                <br />
                <span className="text-gray-500">{formatDate(date!)}</span>
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
