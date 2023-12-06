interface PostWrapperProps {
  path: string;
  children: React.ReactNode;
}

const PostWrapper = ({ children }: PostWrapperProps) => {
  return (
    <div className="max-w-2xl md:pt-8 px-6 mx-auto">
      <section className="w-full md:pb-0 md:pr-0">
        <div className="flex flex-col gap-5">{children}</div>
      </section>
    </div>
  );
};

export { PostWrapper };
