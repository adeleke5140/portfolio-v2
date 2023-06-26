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
  language?: string
};

const filter = ["All", "Published", "Draft"];
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
        <p className="text-2xl font-erode font-bold mb-4">
          A couple of my writings:{" "}
        </p>
        <section className="font-erode">
          <ul>
            {allPostsData.map(({ id, date, title, status }) => (
              <li key={id} className="mb-4 font-satoshi">
                <Link
                  className="text-base inline-block md:transition-transform ease-out duration-200 md:hover:text-link-color"
                  href={`/blog/${id}`}
                >
                  {title}{" "}
                  {status && (
                    <span className="bg-button-bg rounded-full p-1 px-2">
                      {status}
                    </span>
                  )}
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
