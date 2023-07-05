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
      <PageWrapper heading="About me." path="/">
        <section className="prose pb-3 font-mono">
          <p>
            Hello, I am Kehinde, a Frontend Engineer and a11y advocate. I work
            at the intersection of frontend, design and digital accessibility.
          </p>

          <p>
            I build minimal, responsive, accessible and inclusive web
            applications to achieve your business goals.
          </p>

          <section>
            I have experience in the following languages:
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
            A number of technologies I have experience in also include:
            <ul className="flex flex-wrap list-none gap-1 pl-0 prose-ul:pl-0">
              {technologies.map((technology, id) => (
                <li
                  key={id}
                  className="after:content-[','] cursor-default last:after:content-['.'] font-extrabold prose-code:text-button-text transition-transform ease-out duration-200 -translate-x-1 hover:translate-x-0 rounded"
                >
                  <code>{technology}</code>
                </li>
              ))}
            </ul>
          </section>
          <p>
            Would you love to collaborate? Reach out to me on{" "}
            <a href="https://twitter.com/adeleke5140">Twitter</a> or{" "}
            <a href="https://www.linkedin.com/in/adeleke5140/">Linkedin</a>. I
            always love connecting with new people.
          </p>
          <p>
            <a
              className="max-w-max flex items-center justify-start gap-2"
              href="mailto:kehindeadeleke927@gmail.com?subject=Hi Kehinde, wanna work with you"
            >
              <MailIcon size={16} />
              <span> Send a message</span>
            </a>
          </p>
        </section>
      </PageWrapper>
    </>
  );
};

export default About;
