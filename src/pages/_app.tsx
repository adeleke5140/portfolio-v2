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
      className={`${fonts.crim_pro.variable} h-full ${fonts.sm.variable} ${fonts.comm.variable} home font-sans bg-ken-white text-ken-black`}
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
