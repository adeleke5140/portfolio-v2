import { fonts } from '@/fonts/setup'
import '@/styles/globals.css'
import { Toaster } from 'sonner'
import { BlogAssistantWrapper } from '@/components/blog/blog-assistant-wrapper'
import { getSortedPostsData } from '@/lib/posts'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${fonts.mondwest.variable} ${fonts.berkeleyMono.variable} ${fonts.neue.variable} ${fonts.editorialNew.variable}`}
      >
        <div
          className={`min-h-screen font-sans max-w-[1028px] mx-auto  bg-[rgb(248,249,250)] text-ken-black`}
          id="container"
        >
          <Toaster />
          <div className="relative flex flex-col min-h-screen max-w-[1280px]  mx-auto pb-8">
            <main className="flex-1 mt-16 w-full">{children}</main>
          </div>
          <BlogAssistantWrapper />
        </div>
      </body>
    </html>
  )
}
