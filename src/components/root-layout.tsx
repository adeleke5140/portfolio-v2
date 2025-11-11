import Link from 'next/link'

interface RootLayoutProps {
  children: React.ReactNode
}

export const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-[1280px] flex-col px-0 pb-8">
      <nav className="flex items-center justify-between border-b border-b-[#dcdcdc] px-4 py-6 md:px-0">
        <Link href="/" className="font-serif text-xl font-semibold tracking-tight">
          Alfred
        </Link>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a
            href="https://mastra.ai/docs/tools-mcp/mcp-overview"
            target="_blank"
            rel="noreferrer"
            className="hover:text-ken-black"
          >
            MCP docs
          </a>
          <a
            href="https://mastra.ai/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-ken-black"
          >
            Mastra
          </a>
        </div>
      </nav>
      <main className="flex-1 w-full">{children}</main>
    </div>
  )
}
