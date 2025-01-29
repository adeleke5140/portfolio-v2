import Head from 'next/head'

import { Nav } from './nav'

interface LayoutProps {
  children: React.ReactNode
}

const name = 'Kehinde Adeleke.'
const siteTitle = 'Portfolio v2'

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/kehinde.ico" />
        <meta name="description" content={`${name} website`} />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <div className="flex relative pt-8 pb-8 min-h-screen flex-col bg-ken-pattern">
        <Nav />
        <main className="pt-10 flex-1 md:pt-12 place-items-center w-full'">
          {children}
        </main>
        <footer className="w-full mt-10 mb-2 md:px-6 ">
          <div className="max-w-xl rounded-md md:px-6 mx-auto">
            <div className="px-6 py-3 md:px-0 md:pb-2 flex justify-between">
              <p className="text-sm">love, truth and beauty.</p>
              <p className="text-sm">
                &copy;{new Date().getFullYear()}&nbsp;
                <span className="font-medium">ケーニ</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export { Layout }
