import Link from "next/link";
import { useEffect, useRef } from "react";
import Post from "@/pages/blog/[id]";
import { formatDate } from "@/helpers/formatDate";

interface HomeProps {
  posts: Post[];
}

const Home = ({ posts }: HomeProps) => {
  const containerRef = useRef<HTMLElement>(null);


  return (
    <section ref={containerRef} className="px-6 flex flex-col gap-8 relative mt-8 mb-8">
      <section>
        <header className="flex flex-col gap-8">
          <h1 className="font-inter text-lg leading-7">
            Kehinde Adeleke
          </h1>
          <div className="flex flex-col gap-6">
            <p className="select-none leading-[1.6] font-normal">
              <span className="font-serif text-ken-secondary font-[300] italic text-[17px]">Crafting software.{' '}</span>
              I build web applications for companies to achieve their business goals.
              Currently working as a contract frontend dev at <a className="opacity-70 underline underline-offset-2 decoration-1  ">Blocverse.</a>
            </p>
            <p>I contribute to open source at <a className="opacity-70 underline underline-offset-2 decoration-1">Anki</a>.
            </p>
          </div>
        </header>
      </section>
      <section aria-labelledby="projects" className="flex flex-col gap-6">
        <h2 id="projects" className="text-ken-grey text-sm">
          Projects
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-gray-200">
              <a className="underline underline-offset-2 decoration-1">POD</a>
            </h3>
            <p className="text-sm text-ken-grey">Incentivize open source contributors with collectibles</p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-gray-200">
              <a className="underline underline-offset-2 decoration-1">LiveChat</a>
            </h3>
            <p className="text-sm text-ken-grey">Chat live with friends on things you enjoy</p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-gray-200">
              <a className="underline underline-offset-2 decoration-1">Audio-transciber</a>
            </h3>
            <p className="text-sm text-ken-grey">Transcribe your voice using the command line</p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-gray-200">
              <a className="underline underline-offset-2 decoration-1">Writerr</a>
            </h3>
            <p className="text-sm text-ken-grey">Straightforward writing app in a distracted world</p>
          </div>
        </div>
      </section>
      <section aria-labelledby="writing" className="flex flex-col gap-6">
        <h2 id="writing" className="text-ken-grey text-sm">Writing</h2>
        <div className="flex flex-col gap-4">
          {posts.map(post => (
            <div key={post.id} className="flex flex-col">
              <p className="text-gray-200">
                <Link href={`/blog/${post.id}`} className="underline underline-offset-2 decoration-1">{post.title}</Link>
              </p>
              <p className="text-ken-grey place-self-start">{formatDate(post.date!)}</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};


export { Home };
