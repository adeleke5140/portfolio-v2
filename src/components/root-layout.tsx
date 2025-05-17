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
      className={`h-full font-sans  ${fonts.comm.variable} ${fonts.sans.variable}  ${fonts.firaMono.variable} bg-[rgb(248,249,250)] text-ken-black`}
      id="container"
    >
      <Toaster />
      <PostContextWrapper>
        <Layout>{children}</Layout>
      </PostContextWrapper>
    </div>
  )
}
