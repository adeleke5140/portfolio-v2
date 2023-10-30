import { PageWrapper } from "@/components/pageWrapper";
import { formatDate } from "@/helpers/formatDate";
import { getSortedPostsData } from "@/lib/posts";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";

const isDevelopment = process.env.NODE_ENV === "development";

export type Post = {
  id: string;
  date?: string;
  title?: string;
  status?: string;
  language?: string;
};

const isProduction = process.env.NODE_ENV === "production";

const Index = ({
  allPostsData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const Posts = allPostsData.filter((post) => {
    if (isDevelopment) {
      return post;
    } else {
      if (post.status !== "draft" && post.status !== "editing") {
        return post;
      }
    }
  });

  return (
    <>
      <Head>
        <title>Writing</title>
        <link rel="icon" href="/kehinde.ico" />
        <meta name="description" content="Kehinde Adeleke's website" />
        <meta name="og:title" content="Blog" />
      </Head>
      <PageWrapper heading="Writing." path="/">
        <section className="">
          <ul>
            {Posts.map(({ id, date, title, status }) => (
              <li key={id} className="mb-4">
                <Link
                  className="inline-block transition-all hover:underline decoration-1 underline-offset-1 decoration-text-ken-grey"
                  href={`/blog/${id}`}
                >
                  {title} {status}
                </Link>
                <br />
                <span className="text-ken-grey text-xs">
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
