import { PageWrapper } from "@/components/pageWrapper";
import { getSortedPostsData } from "@/lib/posts";
import { GetStaticProps, InferGetStaticPropsType } from "next";
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
    <PageWrapper heading="Blog." path="/">
      <section className="mt-8 font-erode h-screen">
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              <Link href={`/blog/${id}`}>{title}</Link>
              <br />
              <span className="text-gray-500">{date}</span>
            </li>
          ))}
        </ul>
      </section>
    </PageWrapper>
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
