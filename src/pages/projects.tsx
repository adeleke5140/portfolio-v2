import { PageWrapper } from "@/components/pageWrapper";

const Projects = () => {
  return (
    <PageWrapper heading="Projects." path="/">
      <section>
        <p className="mb-4">
          A couple of interesting things I have built include:
        </p>
        <div className="rounded border border-link-color px-4 py-4 mb-4">
          <div className="flex justify-between">
            <div className="mb-2">
              <p className="font-bold">LiveChat</p>
              <span className="text-sm">A realtime message platform</span>
            </div>
            <div className="flex gap-2 text-button-text">
              <span>
                <a
                  href="https://livechat-98e8c.web.app/"
                  className="p-2 font-medium transition-transform ease-out duration-200 hover:bg-button-bg -translate-x-1 hover:translate-x-0 rounded"
                >
                  Live
                </a>
              </span>
              <span>
                <a
                  href="https://github.com/adeleke5140/LiveChat"
                  className="p-2 font-medium transition-transform ease-out duration-200 hover:bg-button-bg -translate-x-1 hover:translate-x-0 rounded"
                >
                  Github
                </a>
              </span>
            </div>
          </div>
          <span className="text-sm">
            <span className="font-bold">Tools:</span> Vue, Firebase Auth,
            Firebase Firestore, CSS
          </span>
        </div>
        <div className="rounded border border-link-color px-4 py-4">
          <div className="flex justify-between">
            <div className="mb-2">
              <p className="font-bold">CountryFact App</p>
              <span className="text-sm">
                Get Facts about various countries around the globe
              </span>
            </div>
            <div className="flex gap-2 text-button-text">
              <span>
                <a
                  href="https://country-fact.netlify.app/"
                  className="p-2 font-medium transition-transform ease-out duration-200 hover:bg-button-bg -translate-x-1 hover:translate-x-0 rounded"
                >
                  Live
                </a>
              </span>
              <span>
                <a
                  href="https://github.com/adeleke5140/country-fact-project"
                  className="p-2 font-medium transition-transform ease-out duration-200 hover:bg-button-bg -translate-x-1 hover:translate-x-0 rounded"
                >
                  Github
                </a>
              </span>
            </div>
          </div>
          <span className="text-sm">
            <span className="font-bold">Tools:</span> React, RestAPI, CSS,
            LocalStorage
          </span>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Projects;
