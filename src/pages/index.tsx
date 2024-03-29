import { Home as HomePage } from '@/components/home';
import { usePostContext } from '@/context/postContext';
import { getSortedPostsData } from '@/lib/posts';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { Post } from './blog';
import { A11ySection } from '@/components/a11ySection';
import { MailIcon } from 'lucide-react';

export default function Home({
  allPostsData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { updatePosts } = usePostContext();
  const completedPosts = allPostsData
    .filter((post) => {
      if (post.status == 'completed') {
        return post;
      }
    })
    .slice(0, 4);
  useEffect(() => {
    updatePosts(completedPosts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Head>
        <title>Kehinde Adeleke</title>
        <meta name="description" content="Kehinde Adeleke's portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/kehinde.ico" />
      </Head>

      <section>
        <div className="max-w-2xl mx-auto">
          <HomePage posts={completedPosts} />
          <A11ySection />
          <section
            aria-labelledby="Connect"
            className="px-6 my-8 flex flex-col gap-6 sm:pb-20"
          >
            <h2 id="Connect" className=" text-sm">
              Connect
            </h2>
            <div className="flex flex-col gap-4">
              <p className="leading-6">
                You can find me on{' '}
                <a
                  href="https://www.linkedin.com/in/adeleke5140/"
                  className="underline underline-offset-2 decoration-1 decoration-ken-grey"
                >
                  Linkedin
                </a>
                . I always love connecting with new people so don&apos;t
                hesitate to reach out.
              </p>
              <p>
                <a
                  className="underline underline-offset-2 decoration-1 decoration-ken-grey  max-w-max flex items-center justify-start gap-2"
                  href="mailto:kehindeadeleke927@gmail.com?subject=Hi Kehinde, wanna work with you"
                >
                  <MailIcon size={16} />
                  <span> Send a message</span>
                </a>
              </p>
            </div>
          </section>
        </div>
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
