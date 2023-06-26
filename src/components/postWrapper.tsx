import { BackButton } from "./backButton";

interface PostWrapperProps {
  path: string;
  children: React.ReactNode;
}

const PostWrapper = ({ children, path }: PostWrapperProps) => {
  return (
    <section className="h-full mx-auto w-full relative pr-8 pb-8 md:pb-0 md:pr-0">
      <div className="flex flex-col gap-5">{children}</div>
      <BackButton text="Blog" path={path} />
    </section>
  );
};

export { PostWrapper };
