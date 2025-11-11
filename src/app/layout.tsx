import { fonts } from '@/fonts/setup'
import '@/styles/globals.css'
import { Toaster } from 'sonner'
import { RootLayout } from '@/components/root-layout'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${fonts.instrumentSans.variable} ${fonts.instrumentSerif.variable} ${fonts.berkeleyMono.variable} antialiased`}
      >
        <div
          className="min-h-screen font-sans bg-[rgb(248,249,250)] text-ken-black"
          id="container"
        >
          <Toaster />
          <RootLayout>{children}</RootLayout>
        </div>
      </body>
    </html>
  )
}
