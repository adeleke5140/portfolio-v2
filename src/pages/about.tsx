import { BackButton } from "@/components/backButton";
import { PageWrapper } from "@/components/pageWrapper";
import Head from "next/head";
import Link from "next/link";

const languages = ["HTML", "CSS", "Javascript", "Typescript", "Ruby", "Go"];

const technologies = [
  "React",
  "Vue",
  "Next",
  "Nuxt",
  "Gatsby",
  "RTK",
  "GraphQL",
  "MDX",
];

const About = () => {
  return (
    <>
      <Head>
        <title>Kehinde | About Me</title>
        <meta name="description" content="Kehinde Adeleke's portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/kehinde.ico" />
      </Head>
      <PageWrapper heading="About me." path="/">
        <section className="prose pb-3">
          <p>
            Hello, I am Kehinde. I am a Junior Frontend Engineer from Lagos,
            Nigeria, who is interested in digital accessibility. I like the web
            and how exciting it is to build on. It&apos;s why I am rebuilding my
            portfolio because it is fun. Genuinely.
          </p>

          <p>
            I have been digging into NextJS, Gatsby and Typescript recently.
            Regarding Typescript, I am currently working through
            <a href="https://effectivetypescript.com/">
              {" "}
              Effective typescript
            </a>{" "}
            by Dan Vanderkam. It&apos;s packed with insight.
          </p>
          <p>
            For my React (which I always want to get better at), I am taking
            Josh Comeau&apos; course:{" "}
            <a href="https://www.joyofreact.com/">The Joy of React.</a>{" "}
            Josh&apos;s blog posts have helped me in the past with my react so I
            am positive his course would make me a better developer.
          </p>
          <section>
            Onto the meatier part: A couple of programming languages I have used
            in the past include:
            <ul className="flex list-none gap-1 pl-0 prose-ul:pl-0">
              {languages.map((language, id) => (
                <li
                  key={id}
                  className="font-extrabold prose-code:text-button-text transition-transform ease-out duration-200 hover:bg-button-bg -translate-x-1 hover:translate-x-0 rounded"
                >
                  <code>{language}</code>
                </li>
              ))}
            </ul>
            A number of technologies I have experience in also include:
            <ul className="flex list-none gap-1 pl-0 prose-ul:pl-0">
              {technologies.map((technology, id) => (
                <li
                  key={id}
                  className="font-extrabold prose-code:text-button-text transition-transform ease-out duration-200 hover:bg-button-bg -translate-x-1 hover:translate-x-0 rounded"
                >
                  <code>{technology}</code>
                </li>
              ))}
            </ul>
          </section>
          <p>
            You can check out my projects here:{" "}
            <Link href="/projects">Projects</Link>
          </p>
          <p>
            I am mostly active on Twitter and sometimes Linkeldn, so you can
            connect with me there. I am always open to meeting new people.
          </p>
        </section>
      </PageWrapper>
    </>
  );
};

export default About;
