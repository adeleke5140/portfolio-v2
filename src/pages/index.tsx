import { Layout } from "@/components/layout";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Kehinde | web engineer</title>
        <meta name="description" content="Kehinde Adeleke's portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/kehinde.ico" />
      </Head>

      <section className="flex flex-col justify-center h-screen">
        <header className="mb-8">
          <h1 className="font-satoshi text-heading-color text-6xl sm:text-8xl font-extrabold">
            Kehinde.
          </h1>
          <h2 className="mt-8 font-normal leading-[1.6] font-erode">
            web engineer
          </h2>
        </header>
        <nav>
          <p>
            <Link href="/blog" className="link">
              /blog.
            </Link>
          </p>
          <p className="mt-4">
            <Link href="/about" className="link">
              /about.
            </Link>
          </p>
          <p className="mt-4">
            <Link href="/projects" className="link">
              /projects.
            </Link>
          </p>
        </nav>
      </section>
    </>
  );
}
