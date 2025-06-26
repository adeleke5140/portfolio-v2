'use client'
import { Toaster } from 'sonner'

import { PostContextWrapper } from '@/context/postContext'
import { Layout } from './layout'
import { fonts } from '@/fonts/setup'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={`min-h-screen font-sans  ${fonts.comm.variable} ${fonts.clashDisplay.variable} ${fonts.berkeleyMono.variable} bg-[rgb(248,249,250)] text-ken-black`}
      id="container"
    >
      <Toaster />
      <PostContextWrapper>
        <Layout>{children}</Layout>
      </PostContextWrapper>
    </div>
  )
}
