import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { satoshiFont, erodeFont } from "@/fonts/setup";
import { Layout } from "@/components/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${satoshiFont.variable} ${erodeFont.variable} home font-sans`}
      id="container"
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
