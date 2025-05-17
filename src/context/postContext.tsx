import { createContext, useContext, useState } from "react";
import type { Post } from "@/app/blog/page";
interface PostContextProps {
  post: Post[];
  updatePosts: (value: Post[]) => void;
}

const PostContext = createContext<PostContextProps>({
  post: [],
  updatePosts: () => { },
});

interface PostContextWrapperProps {
  children: React.ReactNode;
}

export const PostContextWrapper = ({ children }: PostContextWrapperProps) => {
  const [post, setPosts] = useState<Post[]>([]);

  const updatePosts = (value: Post[]) => {
    setPosts(value);
  };

  return (
    <PostContext.Provider value={{ post, updatePosts }}>
      {children}
    </PostContext.Provider>
  );
}

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error(
      "usePostContext must be used within a PostContextWrapper"
    );
  }
  return context;
};
