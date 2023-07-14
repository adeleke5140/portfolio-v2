import { useRef } from "react";
import { BackButton } from "./backButton";
import { CommandButton } from "./commandButton";
import { CommandMenu } from "./commandMenu";

interface PageWrapperProps {
  heading: string;
  path: string;
  children: React.ReactNode;
}

const PageWrapper = ({ heading, children, path }: PageWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} className="relative max-w-[50rem] sm:pl-8 md:ml-[12%] md:pl-16 ">
      <div className="absolute z-[3] right-0">
        <CommandButton />
      </div>
      <section className="h-full relative p-4">
        <div className="flex flex-col gap-5 mb-8">
          <h1 className="title font-mono">{heading}</h1>
          <BackButton path={path} text="../" />
        </div>
        {children}
        <CommandMenu container={containerRef} />
      </section>
    </div>
  );
};

export { PageWrapper };
