import { BackButton } from "./backButton";

interface PageWrapperProps {
  heading: string;
  path: string;
  children: React.ReactNode;
}

const PageWrapper = ({ heading, children, path }: PageWrapperProps) => {
  return (
    <div className="max-w-xl sm:pl-8 md:ml-[12%] md:pl-16 ">
      <section className="h-full relative p-4">
        <div className="flex flex-col gap-5 mb-8">
          <h1 className="title font-mono">{heading}</h1>
          <BackButton path={path} text="../" />
        </div>
        {children}
      </section>
    </div>
  );
};

export { PageWrapper };
