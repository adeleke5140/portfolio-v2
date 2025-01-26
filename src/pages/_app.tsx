import '@/styles/globals.css'
import '@/styles/themes/laserwave.css'
import type { AppProps } from 'next/app'
import { fonts } from '@/fonts/setup'
import { Layout } from '@/components/layout'
import { PostContextWrapper } from '@/context/postContext'
import { Toaster } from 'sonner'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`dark:bg-[#1a1a1a] ${fonts.serif.variable} dark:text-[#e5e5e5] h-full ${fonts.comm.variable} ${fonts.sans.variable}  ${fonts.sm.variable} home font-reading bg-white text-ken-black`}
      id="container"
    >
      <Toaster />
      <PostContextWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PostContextWrapper>
    </div>
  )
}
