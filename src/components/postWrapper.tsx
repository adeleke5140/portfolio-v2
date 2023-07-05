interface PostWrapperProps {
  path: string;
  children: React.ReactNode;
}

const PostWrapper = ({ children }: PostWrapperProps) => {
  return (
    <div className="max-w-xl mx-auto">
      <section className="w-full md:pb-0 md:pr-0">
        <div className="flex flex-col gap-5 p-4 md:p-0">{children}</div>
      </section>
    </div>
  );
};

export { PostWrapper };
