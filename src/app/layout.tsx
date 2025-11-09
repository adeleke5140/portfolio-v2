import { fonts } from '@/fonts/setup'
import '@/styles/globals.css'
import Link from 'next/link'
import { Toaster } from 'sonner'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div
          className={`min-h-screen font-sans max-w-[1028px] mx-auto ${fonts.mondwest.variable} ${fonts.berkeleyMono.variable} ${fonts.neue.variable} ${fonts.editorialNew.variable} ${fonts.mori.variable} bg-[rgb(248,249,250)] text-ken-black`}
          id="container"
        >
          <Toaster />
          <div className="relative flex flex-col min-h-screen max-w-[1280px]  mx-auto pb-8">
            <nav className="flex gap-4 px-3 md:px-0 h-full items-center justify-end py-5">
              <Link href="/craft">Craft</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/">Home</Link>
            </nav>
            <main className="flex-1 w-full">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
