import Link from 'next/link';
import Post from '@/pages/blog/[id]';
import { formatDate } from '@/helpers/formatDate';

interface HomeProps {
  posts: Post[];
}

const allPosts = {
  id: '',
  href: '/blog',
  title: 'All posts',
  date: '',
};

const Home = ({ posts }: HomeProps) => {
  const updatedPosts = [...posts, allPosts];

  return (
    <section className="px-6 md:pt-8 flex flex-col gap-8 md:gap-10 relative mt-8 mb-8">
      <section>
        <header className="flex flex-col gap-8">
          <h1 className=" font-normal text-lg leading-7 md:pb-4">
            Kehinde Adeleke
          </h1>
          <div className="flex flex-col gap-6">
            <p className="select-none leading-[1.6] font-normal">
              <span className="font-serif  font-[300] italic text-[17px]">
                Crafting software.{' '}
              </span>
              I build web applications to help you{' '}
              <span className="font-serif text-[17px] font-[300] italic">
                achieve
              </span>{' '}
              your business goals. Currently crafting products at{' '}
              <a
                href="https://www.blocverse.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 underline underline-offset-2 decoration-1 decoration-ken-grey hover:bg-white/30"
              >
                Blocverse.
              </a>
            </p>
            <p>
              I am also contributing accessibility improvements to the{' '}
              <a
                href="https://github.com/ankitects/anki"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-70 underline underline-offset-2 decoration-1 decoration-ken-grey hover:bg-white/30"
              >
                Anki
              </a>{' '}
              open source project.
            </p>
          </div>
        </header>
      </section>
      <section aria-labelledby="projects" className="flex flex-col gap-6">
        <h2 id="projects" className=" text-sm">
          Projects
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <h3 className="">
              <a
                href="https://pod-hackfs.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 decoration-1 decoration-ken-grey hover:bg-white/30"
              >
                POD
              </a>
            </h3>
            <p className="text-sm ">
              Incentivize open source contributors with collectibles
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="">
              <a
                href="https://livechat-98e8c.web.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 decoration-1 decoration-ken-grey hover:bg-white/30"
              >
                LiveChat
              </a>
            </h3>
            <p className="text-sm ">
              Chat live with friends on things you enjoy
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="">
              <a
                href="https://github.com/adeleke5140/audio-transcriber"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 decoration-1 decoration-ken-grey hover:bg-white/30"
              >
                Audio-transcriber
              </a>
            </h3>
            <p className="text-sm ">
              Transcribe your voice using the command line
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="">
              <a
                href="https://github.com/adeleke5140/writerr/tree/main"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 decoration-1 decoration-ken-grey hover:bg-white/30"
              >
                Writerr
              </a>
            </h3>
            <p className="text-sm ">
              Straightforward writing app in a distracted world
            </p>
          </div>
        </div>
      </section>
      <section aria-labelledby="writing" className="flex flex-col gap-6">
        <h2 id="writing" className=" text-sm">
          Writing
        </h2>
        <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
          {updatedPosts.map((post) => (
            <div key={post.id} className="flex flex-col md:gap-2">
              <p className="">
                <Link
                  href={`/blog/${post.id}`}
                  className="underline underline-offset-2 decoration-1 decoration-ken-grey"
                >
                  {post.title}
                </Link>
              </p>
              <p className=" text-xs place-self-start">
                {formatDate(post.date!)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export { Home };
