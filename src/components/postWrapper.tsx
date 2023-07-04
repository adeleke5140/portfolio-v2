interface PostWrapperProps {
  path: string;
  children: React.ReactNode;
}

const PostWrapper = ({ children }: PostWrapperProps) => {
  return (
    <div className="max-w-xl mx-auto">
      <section className="w-full pr-8 pb-8 md:pb-0 md:pr-0">
        <div className="flex flex-col gap-5">{children}</div>
      </section>
    </div>
  );
};

export { PostWrapper };
