import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
}

const name = 'Kehinde Adeleke.';
const siteTitle = 'Portfolio v2';

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="home ">
      <Head>
        <link rel="icon" href="/kehinde.ico" />
        <meta name="description" content={`${name} website`} />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <div className="flex min-h-screen flex-col bg-ken-pattern">
        <main className="pt-8 md:pt-12">{children}</main>
        <footer className="mt-auto md:px-6 border-ken-grey border-t-[0.8px] border-solid">
          <div className="max-w-2xl md:px-6 mx-auto">
            <div className="px-6 py-3 md:px-0 flex justify-between">
              <p className=" text-sm">excitement. luck. adventure.</p>
              <p className=" text-sm">
                &copy;{new Date().getFullYear()}&nbsp;
                <span className="font-medium">ケーニ</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export { Layout };
