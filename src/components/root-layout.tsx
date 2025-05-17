'use client'
import { Toaster } from "sonner"

import { PostContextWrapper } from "@/context/postContext"
import { Layout } from "./layout"
import { fonts } from "@/fonts/setup"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={`dark:bg-[#1a1a1a] h-full dark:text-[#e5e5e5] font-sans  ${fonts.comm.variable} ${fonts.sans.variable}  ${fonts.firaMono.variable} bg-[rgb(248,249,250)] text-ken-black`}
      id="container"
    >
      <Toaster />
      <PostContextWrapper>
        <Layout>
         {children}
        </Layout>
      </PostContextWrapper>
    </div>
  )
}