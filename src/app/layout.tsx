import { BlogAssistantWrapper } from '@/components/blog/blog-assistant-wrapper'
import { fonts } from '@/fonts/setup'
import '@/styles/globals.css'
import Link from 'next/link'
import { Toaster } from 'sonner'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${fonts.newsreader.variable} ${fonts.berkeleyMono.variable}`}
      >
        <div
          className={`min-h-screen font-sans outline outline-pink-200  bg-[#fdfdfa] text-ken-black`}
          id="container"
        >
          <Toaster />
          <div className="relative flex flex-col min-h-screen pb-8">
            <header className="mt-4 max-w-[36rem] w-full mx-auto flex border-y py-3 border-[#dcdcdc7e] items-center justify-between">
              <Link href="/" className="text-[17.5px]">
                Kehinde Adeleke
              </Link>
              <nav className="flex cursor-pointer items-center">
                <Link
                  href="/craft"
                  className="text-ken-grey text-[17.5px] -ml-3 px-3 py-1 rounded-xl "
                >
                  Craft
                </Link>
                <Link
                  href="/blog"
                  className="text-ken-grey text-[17.5px] px-3 py-1 rounded-xl "
                >
                  Blog
                </Link>
              </nav>
            </header>
            <main className="flex-1 max-w-[36rem] mx-auto w-full">
              {children}
            </main>
          </div>
          {/* <BlogAssistantWrapper /> */}
        </div>
      </body>
    </html>
  )
}
