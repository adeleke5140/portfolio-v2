import { PageWrapper } from "@/components/pageWrapper";
import Head from "next/head";
import { MailIcon } from "lucide-react";

const languages = ["HTML", "CSS", "Javascript", "Typescript", "Go"];

const technologies = [
  "ReactJS",
  "VueJS",
  "Next",
  "Gatsby",
  "RTK",
  "TailwindCSS",
  "Zustand",
  "Jest",
  "GraphQL",
  "MongoDB",
  "NodeJS",
  "ExpressJS",
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
      <PageWrapper heading="Tech stack." path="/">
        <section className="prose pb-3 text-ken-primary">
          <p className="font-[300] font-serif italic text-[17px]">I pick the perfect tool from my toolbox to solve problems.</p>
          <section>
            With languages, some of it include:
            <ul className="flex flex-wrap list-none gap-1 pl-0 prose-ul:pl-0">
              {languages.map((language, id) => (
                <li
                  key={id}
                  className="after:content-[','] cursor-default last:after:content-['.'] font-extrabold prose-code:text-button-text transition-transform ease-out duration-200 -translate-x-1 hover:translate-x-0 rounded"
                >
                  <code>{language}</code>
                </li>
              ))}
            </ul>
            Frameworks, libraries and tools I use include:
            <ul className="flex flex-wrap list-none gap-1 pl-0 prose-ul:pl-0 prose-li:pl-0 prose-li:pr-2 prose-ul:text-ken-primary">
              {technologies.map((technology, id) => (
                <li
                  key={id}
                  className="prose:-li:pl-0 after:content-[','] cursor-default last:after:content-['.']"
                >
                  <code>{technology}</code>
                </li>
              ))}
            </ul>
            <p>
              I am not restricted to these as I pick up tools as I go.
            </p>
            <p className="font-serif italic font-[300] text-[17px]">My unique ability is picking up new skills when needed. I am a thriving learner.</p>
          </section>
        </section>
      </PageWrapper>
    </>
  );
};

export default About;
