import { Home as HomePage } from "@/components/home";
import { usePostContext } from "@/context/postContext";
import { getSortedPostsData } from "@/lib/posts";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { Post } from "./blog";
import { A11ySection } from "@/components/a11ySection";
import { MailIcon } from "lucide-react";

export default function Home({
  allPostsData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { updatePosts } = usePostContext();
  const completedPosts = allPostsData.filter((post) => {
    if (post.status == 'completed') {
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

      <section className="max-w-[50rem]">
        <HomePage posts={completedPosts} />
        <A11ySection />
        <section aria-labelledby="Connect" className="px-6 mt-8 flex flex-col gap-6">
          <h2 id="Connect" className="text-ken-grey text-sm">Connect</h2>
          <div className="flex flex-col gap-4">
            <p>
              Would you love to collaborate? Reach out on {" "}
              <a href="https://www.linkedin.com/in/adeleke5140/" className="underline underline-offset-2">Linkedin</a>. I
              always love connecting with new people or you could:
            </p>
            <p>
              <a
                className="underline underline-offset-2 max-w-max flex items-center justify-start gap-2"
                href="mailto:kehindeadeleke927@gmail.com?subject=Hi Kehinde, wanna work with you"
              >
                <MailIcon size={16} />
                <span> Send a message</span>
              </a>
            </p>
          </div>
        </section>
        <footer className="mt-8 border-ken-grey border-t-[1.2px] border-solid">
          <div className="px-6 py-3 flex justify-between">
            <p className="text-ken-grey text-sm">
              grit. passion. curiosity.
            </p>
            <p className="text-ken-grey text-sm">
              &copy;{new Date().getFullYear()} Kehinde Adeleke
            </p>
          </div>

        </footer>
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
