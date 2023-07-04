import Head from "next/head";

interface LayoutProps {
  children: React.ReactNode;
}

const name = "Kehinde Adeleke.";
const siteTitle = "Portfolio v2";

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="home min-h-screen">
      <Head>
        <link rel="icon" href="/kehinde.ico" />
        <meta name="description" content={`${name} website`} />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <div>
        <main className="pt-8 md:pt-12">{children}</main>
      </div>
    </div >
  );
};

export { Layout };
