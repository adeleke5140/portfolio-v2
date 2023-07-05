import { PageWrapper } from "@/components/pageWrapper";
import Link from "next/link";

const projects = [
  {
    id: 1,
    name: "Proof-of-Dev",
    subtitle: "Reward open-source contributors with collectibles",
    tools: "NextJS, Tailwind, Viem, ConnectKit, RadixUI",
    live: "https://pod-hackfs.vercel.app/",
    github: "https://github.com/adeleke5140/pod-frontend"
  },
  {
    id: 2,
    name: "LiveChat",
    subtitle: "A realtime message platform",
    tools: "Vue, Firebase Auth, Firebase Firestore, CSS",
    live: "https://livechat-98e8c.web.app/",
    github: "https://github.com/adeleke5140/LiveChat",
    status: "in-progress",
  },
  {
    id: 3,
    name: "Send_over",
    subtitle: "Share links between devices in realTime",
    tools: "Astro, ReactJS, Tailwind, Supabase",
    live: "https://send-over.vercel.app/",
    github: "https://github.com/adeleke5140/send_over",
    status: "discontinued"
  },
  {
    id: 4,
    name: "CountryFact App",
    subtitle: "Get Facts about various countries around the globe",
    tools: "React, RestAPI, CSS, LocalStorage",
    live: "https://country-fact.netlify.app/",
    github: "https://github.com/adeleke5140/country-fact-project",
  },
];

const Projects = () => {
  return (
    <PageWrapper heading="Projects." path="/">
      <section className="font-mono">
        <p className="mb-4">
          A couple of interesting things I have built include:
        </p>
        {projects.map((project) => (
          <section
            key={project.id}
            className="rounded border border-link-color px-4 py-4 mb-4 hover:bg-button-bg hover:bg-opacity-50 transition-transform ease-out duration-200 translate-x-1 hover:translate-x-0"
          >
            <div className="flex justify-between ">
              <div className="mb-2">
                <p className="font-bold">{project.name}{" "}{project.status ? <span className="text-sm">({project.status})</span> : null}</p>
              </div>
              <div className="flex gap-2 text-button-text">
                <span>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 font-medium transition-transform ease-out duration-200 hover:bg-app-bg -translate-x-1 hover:translate-x-0 rounded"
                  >
                    Live
                  </a>
                </span>
                <span>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 font-medium transition-transform ease-out duration-200 hover:bg-app-bg -translate-x-1 hover:translate-x-0 rounded"
                  >
                    Github
                  </a>
                </span>
              </div>
            </div>
            <p className="mb-2">{project.subtitle}</p>
          </section>
        ))}
        ...
        <p className="mt-4">
          I write about interesting software topics on my{" "}
          <Link href="/blog" className="underline font-bold">
            Blog
          </Link>
        </p>
      </section>
    </PageWrapper>
  );
};

export default Projects;
