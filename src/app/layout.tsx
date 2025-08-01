import { RootLayout } from '@/components/root-layout'
import { fonts } from '@/fonts/setup'
import '@/styles/globals.css'
import { Toaster } from 'sonner'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div
          className={`min-h-screen font-sans ${fonts.inter.variable}  ${fonts.comm.variable} ${fonts.clashDisplay.variable} ${fonts.berkeleyMono.variable} ${fonts.sort.variable} bg-[rgb(248,249,250)] text-ken-black`}
          id="container"
        >
          <Toaster />
          <RootLayout>{children}</RootLayout>
        </div>
      </body>
    </html>
  )
}
