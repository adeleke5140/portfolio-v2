import { RootLayout } from '@/components/root-layout'
import { fonts } from '@/fonts/setup'
import '@/styles/globals.css'
import { Toaster } from 'sonner'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div
          className={`min-h-screen font-sans ${fonts.berkeleyMono.variable} ${fonts.neue.variable} ${fonts.editorialNew.variable} ${fonts.instrumentSans.variable} ${fonts.instrumentSerif.variable} bg-[rgb(248,249,250)] text-ken-black`}
          id="container"
        >
          <Toaster />
          <RootLayout>{children}</RootLayout>
        </div>
      </body>
    </html>
  )
}
