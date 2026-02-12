import { fonts } from '@/fonts/setup'
import '@/styles/globals.css'
import Link from 'next/link'
import { Toaster } from 'sonner'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <meta name="description" content="Kehinde Adekeke's website where he explores design and engineering" />
      <body className={`${fonts.berkeleyMono.variable} ${fonts.sans.variable}`}>
        <div
          className={`min-h-screen font-sans outline outline-pink-200  bg-[rgb(248,249,250)] text-ken-black`}
          id="container"
        >
          <Toaster />
          <div className="relative flex px-6 flex-col min-h-screen pb-8">
            <header className="mt-4 max-w-[36rem] w-full mx-auto flex border-y py-3 border-[#dcdcdc7e] items-center justify-between">
              <Link href="/" className="text-base">
                Kehinde Adeleke
              </Link>
              <nav className="flex cursor-pointer items-center">
                <Link
                  href="/craft"
                  className="text-ken-grey text-base -ml-3 px-3 py-1 rounded-xl "
                >
                  Craft
                </Link>
                <Link
                  href="/blog"
                  className="text-ken-grey text-base px-3 py-1 rounded-xl "
                >
                  Blog
                </Link>
              </nav>
            </header>
            <main className="flex-1 max-w-[36rem] mx-auto w-full">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
