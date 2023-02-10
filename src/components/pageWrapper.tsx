import { BackButton } from "./backButton";

interface PageWrapperProps {
  heading: string;
  path: string;
  children: React.ReactNode;
}

const PageWrapper = ({ heading, children, path }: PageWrapperProps) => {
  return (
    <section className="h-full">
      <div className="flex flex-col gap-5">
        <h1 className="title">{heading}</h1>
        <BackButton path={path} text="Back" />
      </div>
      {children}
    </section>
  );
};

export { PageWrapper };
