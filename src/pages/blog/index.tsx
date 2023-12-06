import { PageWrapper } from '@/components/pageWrapper';
import { formatDate } from '@/helpers/formatDate';
import { getSortedPostsData } from '@/lib/posts';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const isDevelopment = process.env.NODE_ENV === 'development';

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
  const Posts = allPostsData.filter((post) => {
    if (isDevelopment) {
      return post;
    } else {
      if (
        post.status !== 'draft' &&
        post.status !== 'editing' &&
        post.status !== 'archived'
      ) {
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
      <section className="max-w-2xl px-6 flex flex-col gap-6 mx-auto md:pt-8 mt-8 mb-8">
        <h1 className="text-xl font-medium ">Writing.</h1>
        <Link href="/" className="text-sm text-right underline">
          home
        </Link>
        <section className="">
          <ul>
            {Posts.map(({ id, date, title, status }) => (
              <li key={id} className="mb-4 flex items-center justify-between ">
                <Link
                  className="inline-block transition-all hover:underline hover:underline-offset-4 decoration-2 decoration-text-ken-grey"
                  href={`/blog/${id}`}
                >
                  {title}{' '}
                </Link>
                <span className="text-ken-grey text-xs">
                  {formatDate(date!)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </section>
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
