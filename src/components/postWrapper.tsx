import { BackButton } from "./backButton";

interface PostWrapperProps {
  path: string;
  children: React.ReactNode;
}

const PostWrapper = ({ children, path }: PostWrapperProps) => {
  return (
    <section className="h-full relative">
      <div className="flex flex-col gap-5">{children}</div>
      <BackButton text="Blog" path={path} />
    </section>
  );
};

export { PostWrapper };
