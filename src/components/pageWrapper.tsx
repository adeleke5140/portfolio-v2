import { BackButton } from "./backButton";


interface PageWrapperProps {
  heading: string;
  path: string;
  children: React.ReactNode;
}

const PageWrapper = ({ heading, children, path }: PageWrapperProps) => {
  return (
    <div className="relative px-6 max-w-2xl mx-auto">
      <div className="flex flex-col gap-5 mb-8 pt-8">
        <BackButton path={path} text="Go home" />
        <h1 className="font-medium text-xl">{heading}</h1>
      </div>
      {children}
    </div>
  );
};

export { PageWrapper };
