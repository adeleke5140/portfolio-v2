import "@/styles/globals.css";
import "@/styles/themes/laserwave.css";
import type { AppProps } from "next/app";
import { dm_sans, newsreader, inter, space_grotesk } from "@/fonts/setup";
import { Layout } from "@/components/layout";
import { CommandContextWrapper } from "@/context/commandContext";
import { PostContextWrapper } from "@/context/postContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={` ${dm_sans.variable} ${newsreader.variable} ${inter.variable} ${space_grotesk.variable} home font-sans bg-ken-black text-ken-primary`}
      id="container"
    >
      <CommandContextWrapper>
        <PostContextWrapper>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PostContextWrapper>
      </CommandContextWrapper>
    </div>
  );
}
