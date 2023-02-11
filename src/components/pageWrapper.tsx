import { BackButton } from "./backButton";

interface PageWrapperProps {
  heading: string;
  path: string;
  children: React.ReactNode;
}

const PageWrapper = ({ heading, children, path }: PageWrapperProps) => {
  return (
    <section className="h-full relative pr-8">
      <div className="flex flex-col gap-5 mb-8">
        <h1 className="title font-erode">{heading}</h1>
        <BackButton path={path} text="Home" />
      </div>
      {children}
    </section>
  );
};

export { PageWrapper };
