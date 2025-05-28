interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="relative min-h-screen pt-8 pb-8">
        <div
          aria-hidden={true}
          className="fixed top-0 min-w-[1000px] z-10 h-[400px] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.15] pointer-events-none"
          style={{
            background: 'radial-gradient(#e87400, transparent 50%)',
          }}
        />
        <svg
          className="absolute pointer-events-none inset-0 h-full w-full stroke-gray-200 opacity-50 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
              width="200"
              height="200"
              x="50%"
              y="-1"
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none"></path>
            </pattern>
          </defs>
          <svg x="50%" y="-1" className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth="0"
            ></path>
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth="0"
            fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
          ></rect>
        </svg>
        <main className="pt-10 md:pt-12  w-full">{children}</main>
        <footer className="w-full mt-10 mb-2 md:px-6">
          <div className="max-w-xl rounded-md md:px-6 mx-auto">
            <div className="px-6 py-3 text-[15px] md:px-0 md:pb-2 flex justify-between">
              <p className="text-sm font-mono">
                <span className="text-[#e87400]">©</span>
                {new Date().getFullYear()}&nbsp;
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export { Layout }
