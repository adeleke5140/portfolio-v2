import '@/styles/globals.css'
import '@/styles/themes/laserwave.css'
import type { AppProps } from 'next/app'
import { fonts } from '@/fonts/setup'
import { Layout } from '@/components/layout'
import { PostContextWrapper } from '@/context/postContext'
import { Toaster } from 'sonner'
//
//rgb(129,210,118)
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`dark:bg-[#1a1a1a] h-full dark:text-[#e5e5e5] font-sans  ${fonts.comm.variable} ${fonts.sans.variable}  ${fonts.firaMono.variable} bg-[rgb(248,249,250)] text-ken-black`}
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
