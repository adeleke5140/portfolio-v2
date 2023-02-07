import Head from "next/head";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

const name = "Kehinde Adeleke.";
const siteTitle = "Portfolio v2";

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-fullcontainer home">
      <Head>
        <link rel="icon" href="/kehinde.ico" />
        <meta name="description" content="Kehinde Adeleke's website" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <section className="max-w-xl pl-8 sm:ml-[12%] sm:pl-16 ">
        <main className="h-screen pt-8 md:pt-16">{children}</main>
        <footer>
          <p>{siteTitle}</p>
        </footer>
      </section>
    </div>
  );
};

export { Layout };
