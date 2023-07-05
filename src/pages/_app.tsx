import "@/styles/globals.css";
import "@/styles/themes/laserwave.css";
import type { AppProps } from "next/app";
import { satoshiFont, erodeFont, dm_mono } from "@/fonts/setup";
import { Layout } from "@/components/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${satoshiFont.variable} ${erodeFont.variable} ${dm_mono.variable} home font-sans`}
      id="container"
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
