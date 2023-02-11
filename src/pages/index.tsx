import { HoverCardComponent } from "@/components/info";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";

const DynamicHoverComponent = dynamic(
  () => import("../components/info").then((mod) => mod.HoverCardComponent),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <>
      <Head>
        <title>Kehinde | web engineer</title>
        <meta name="description" content="Kehinde Adeleke's portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/kehinde.ico" />
      </Head>

      <section className="flex flex-col h-screen justify-center" id="parent">
        <header className="mb-8">
          <h1 className="font-erode text-heading-color text-7xl sm:text-8xl font-extrabold">
            Kehinde.
          </h1>
          <h2 className="mt-8 font-normal leading-[1.6] font-erode">
            web engineer
          </h2>
        </header>
        <nav>
          <p>
            <Link
              href="/blog"
              className="inline-block text-link-color text-3xl opacity-60 font-extrabold hover:opacity-100 origin-left transition-transform-opacity ease-out duration-200 hover:scale-110 hover:translate-x-1 hover:-translate-y-0.5"
            >
              /blog.
            </Link>
          </p>
          <p className="mt-4">
            <Link
              href="/about"
              className="inline-block text-link-color text-3xl opacity-60 font-extrabold hover:opacity-100 origin-left transition-transform-opacity ease-out duration-200 hover:scale-110 hover:translate-x-1 hover:-translate-y-0.5"
            >
              /about.
            </Link>
          </p>
          <p className="mt-4">
            <Link
              href="/projects"
              className="inline-block text-link-color text-3xl opacity-60 font-extrabold hover:opacity-100 origin-left transition-transform-opacity ease-out duration-200 hover:scale-110 hover:translate-x-1 hover:-translate-y-0.5"
            >
              /projects.
            </Link>
          </p>
        </nav>
        <div className="font-erode text-sm sm:text-base absolute bottom-0 pb-2">
          <DynamicHoverComponent />
        </div>
      </section>
    </>
  );
}
