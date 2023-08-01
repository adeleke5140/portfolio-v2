import Link from "next/link";
import { useRef } from "react";
import Post from "@/pages/blog/[id]";
import { formatDate } from "@/helpers/formatDate";

interface HomeProps {
  posts: Post[];
}

const allPosts = {
  id: '',
  href: '/blog',
  title: 'All posts',
  date: ''
}

const Home = ({ posts }: HomeProps) => {
  const updatedPosts = [...posts, allPosts]

  return (
    <section className="px-6 md:pt-16 flex flex-col gap-8 md:gap-10 relative mt-8 mb-8">
      <section>
        <header className="flex flex-col gap-8">
          <h1 className="font-inter font-normal text-lg leading-7 md:pb-4">
            Kehinde Adeleke
          </h1>
          <div className="flex flex-col gap-6">
            <p className="select-none leading-[1.6] font-normal">
              <span className="font-serif text-ken-secondary font-[300] italic text-[17px]">Crafting software.{' '}</span>
              I build web applications for companies to achieve their business goals.
              Currently working as a contract frontend dev at <a className="opacity-70 underline underline-offset-2 decoration-1 decoration-ken-grey  ">Blocverse.</a>
            </p>
            <p>I contribute to open source at <a className="opacity-70 underline underline-offset-2 decoration-1 decoration-ken-grey">Anki</a>.
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
              <a
                href="https://pod-hackfs.vercel.app"
                target="_blank"
                rel="noopener noreferrer" className="underline underline-offset-2 decoration-1 decoration-ken-grey decoration-ken-grey">POD</a>
            </h3>
            <p className="text-sm text-ken-grey">Incentivize open source contributors with collectibles</p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-gray-200">
              <a
                href="https://livechat-98e8c.web.app/"
                target="_blank"
                rel="noopener noreferrer" className="underline underline-offset-2 decoration-1 decoration-ken-grey">LiveChat</a>
            </h3>
            <p className="text-sm text-ken-grey">Chat live with friends on things you enjoy</p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-gray-200">
              <a
                href="https://github.com/adeleke5140/audio-transcriber"
                target="_blank"
                rel="noopener noreferrer" className="underline underline-offset-2 decoration-1 decoration-ken-grey">Audio-transciber</a>
            </h3>
            <p className="text-sm text-ken-grey">Transcribe your voice using the command line</p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-gray-200">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer" className="underline underline-offset-2 decoration-1 decoration-ken-grey">Writerr</a>
            </h3>
            <p className="text-sm text-ken-grey">Straightforward writing app in a distracted world</p>
          </div>
        </div>
      </section>
      <section aria-labelledby="writing" className="flex flex-col gap-6">
        <h2 id="writing" className="text-ken-grey text-sm">Writing</h2>
        <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
          {updatedPosts.map(post => (
            <div key={post.id} className="flex flex-col md:gap-2">
              <p className="text-gray-200">
                <Link href={`/blog/${post.id}`} className="underline underline-offset-2 decoration-1 decoration-ken-grey">{post.title}</Link>
              </p>
              <p className="text-ken-grey text-xs place-self-start">{formatDate(post.date!)}</p>
            </div>
          ))}
        </div>

      </section>
    </section>
  );
};


export { Home };
