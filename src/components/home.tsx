import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CommandMenu } from "./commandMenu";
import { CommandButton } from "./commandButton";

const Home = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  return (
    <section ref={containerRef} className="relative">
      <header className="absolute right-0">
        <CommandButton />
      </header>

      <section>
        <header className="mb-8 pt-[45%] md:pt-[35%]">
          <h1 className="select-none font-satoshi text-heading-color text-6xl sm:text-8xl font-extrabold">
            Kehinde.
          </h1>
          <p className="select-none font-mono mt-8 leading-[1.6] font-[300] text-sm">
            web engineer
          </p>
        </header>
      </section>
      <nav>
        <ul>
          <li>
            <Link
              href="/blog"
              className="inline-block font-mono text-link-color text-2xl opacity-70 font-extrabold hover:opacity-100 origin-left transition-transform-opacity ease-out duration-200 hover:scale-110 hover:translate-x-1 hover:-translate-y-0.5 focus:outline-none rounded focus:ring focus:ring-heading-color"
            >
              /blog.
            </Link>
          </li>
          <li className="mt-4">
            <Link
              href="/about"
              className="inline-block font-mono text-link-color text-2xl opacity-70 font-extrabold hover:opacity-100 origin-left transition-transform-opacity ease-out duration-200 hover:scale-110 hover:translate-x-1 hover:-translate-y-0.5 focus:outline-none rounded focus:ring focus:ring-heading-color"
            >
              /about.
            </Link>
          </li>
          <li className="mt-4">
            <Link
              href="/projects"
              className="inline-block font-mono text-link-color text-2xl opacity-70 font-extrabold hover:opacity-100 origin-left transition-transform-opacity ease-out duration-200 hover:scale-110 hover:translate-x-1 hover:-translate-y-0.5 focus:outline-none rounded focus:ring focus:ring-heading-color"
            >
              /projects.
            </Link>
          </li>
        </ul>
      </nav>
      {hasMounted ? <CommandMenu container={containerRef} /> : null}
    </section>
  );
};

export { Home };
