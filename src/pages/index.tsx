import { dm_mono } from "@/fonts/setup";
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

      <div className="max-w-xl pl-8 sm:ml-[12%] sm:pl-16 ">
        <section className="flex flex-col mt-[43%] justify-center" id="parent">
          <header className="mb-8">
            <h1 className="font-mono text-heading-color text-7xl sm:text-8xl font-extrabold">
              Kehinde.
            </h1>
            <h2 className="font-mono mt-8 leading-[1.6] font-[300] text-sm">
              web engineer
            </h2>
          </header>
          <nav>
            <p>
              <Link
                href="/blog"
                className="inline-block font-mono text-link-color text-2xl opacity-70 font-extrabold hover:opacity-100 origin-left transition-transform-opacity ease-out duration-200 hover:scale-110 hover:translate-x-1 hover:-translate-y-0.5"
              >
                /blog.
              </Link>
            </p>
            <p className="mt-4">
              <Link
                href="/about"
                className="inline-block font-mono text-link-color text-2xl opacity-70 font-extrabold hover:opacity-100 origin-left transition-transform-opacity ease-out duration-200 hover:scale-110 hover:translate-x-1 hover:-translate-y-0.5"
              >
                /about.
              </Link>
            </p>
            <p className="mt-4">
              <Link
                href="/projects"
                className="inline-block font-mono text-link-color text-2xl opacity-70 font-extrabold hover:opacity-100 origin-left transition-transform-opacity ease-out duration-200 hover:scale-110 hover:translate-x-1 hover:-translate-y-0.5"
              >
                /projects.
              </Link>
            </p>
          </nav>

        </section>
      </div>
    </>
  );
}
