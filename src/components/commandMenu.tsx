import { Command, CommandItem } from "cmdk";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import {
  Github,
  Moon,
  Monitor,
  CaseSensitive,
  Edit3,
  ArrowRight,
} from "lucide-react";
import { useCommandContext } from "@/context/commandContext";
import { useRouter } from "next/router";
import { usePostContext } from "@/context/postContext";

interface CommandMenuProps {
  container: RefObject<HTMLElement>;
}

const CommandMenu = ({ container }: CommandMenuProps) => {
  const [parent, setParent] = useState<HTMLElement | undefined>(undefined);
  const { open, toggleCommand } = useCommandContext();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const [pages, setPages] = useState<string[]>(["home"]);
  const activePage = pages[pages.length - 1];
  const isHome = activePage === "home";

  const popPage = useCallback(() => {
    setPages((pages) => {
      const x = [...pages];
      x.splice(-1, 1);
      return x;
    });
  }, []);

  function bounce() {
    if (dialogRef.current) {
      console.log({
        dialog: dialogRef,
      });
      dialogRef.current.style.transform = "scale(0.99)";
      setTimeout(() => {
        if (dialogRef.current) {
          dialogRef.current.style.transform = "";
        }
      }, 100);
    }
  }

  useEffect(() => {
    container.current && setParent(container.current);
  }, [container]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleCommand();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Command.Dialog
        ref={dialogRef}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            bounce();
          }

          if (isHome) {
            return;
          }
          if (e.key === "Backspace") {
            e.preventDefault();
            popPage();
          }
        }}
        className="font-mono"
        container={parent}
        open={open}
        onOpenChange={toggleCommand}
        label="Global Command Menu"
      >
        <div className="relative">
          {pages.map((page, i) => (
            <p key={i} cmdk-home-badge="">
              {page}
            </p>
          ))}
          <Command.Input autoFocus placeholder="Search" />
          <button
            cmdk-home-badge=""
            className="absolute right-5 top-[40%] -translate-y-1/2 p-[0.5px] px-2 text-sm"
          >
            Esc
          </button>
        </div>
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          {activePage === "home" && (
            <Home searchBlog={() => setPages([...pages, "blog"])} />
          )}
          {activePage === "blog" && <Blog />}
        </Command.List>
      </Command.Dialog>
    </div>
  );
};

interface HomeProps {
  searchBlog: () => void;
}

function Home({ searchBlog }: HomeProps) {
  return (
    <>
      <CommandItem
        onSelect={() => {
          searchBlog();
        }}
      >
        <Edit3 />
        blog
      </CommandItem>
      <Command.Group heading="Font">
        <Command.Item>
          <CaseSensitive /> System ui
        </Command.Item>
        <Command.Item>
          <CaseSensitive /> Inter
        </Command.Item>
        <Command.Item>
          <CaseSensitive /> Satoshi and Erode
        </Command.Item>
        <Command.Item>
          <CaseSensitive /> Default
        </Command.Item>
      </Command.Group>

      <Command.Group heading="Theme">
        <Command.Item>
          <Moon /> Dark Mode
        </Command.Item>
        <Command.Item>
          <Monitor /> System
        </Command.Item>
      </Command.Group>

      <Command.Group heading="Connect with me">
        <Command.Item>
          <Github />
          Github
        </Command.Item>
      </Command.Group>
    </>
  );
}

function Blog() {
  const { post } = usePostContext();
  const router = useRouter();
  const { toggleCommand } = useCommandContext();

  return (
    <>
      {post.map((post) => (
        <Command.Item
          onSelect={() => {
            router.push(`/blog/${post.id}`);
            toggleCommand();
          }}
          key={post.id}
        >
          <ArrowRight /> {post.title}
        </Command.Item>
      ))}
    </>
  );
}

export { CommandMenu };
