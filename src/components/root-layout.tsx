import Link from 'next/link'

interface RootLayoutProps {
  children: React.ReactNode
}

export const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <>
      <div className="relative flex flex-col min-h-screen max-w-[1280px]  mx-auto pb-8">
        <nav className="flex gap-4 border-b-[0.5px] px-3 md:px-0  border-b-[#dcdcdc]  h-full items-center justify-end py-5">
          <Link href="/craft" className="text-lg">
            Craft
          </Link>
          <Link href="/blog" className="text-lg">
            Blog
          </Link>
          <Link href="/" className="text-lg">
            Home
          </Link>
        </nav>
        <main className="flex-1 w-full">{children}</main>
      </div>
    </>
  )
}
