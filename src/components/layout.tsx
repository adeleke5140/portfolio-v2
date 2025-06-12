interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="relative min-h-screen pt-8 pb-8">
        <div
          aria-hidden="true"
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
        <footer className="w-full mt-10 mb-2 px-6">
          <div className="max-w-xl rounded-md md:px-6 flex justify-between items-center mx-auto">
            <div className="py-1 px-2 bg-white rounded-xl text-[15px] flex justify-between">
              <p className="text-sm inline-flex items-center gap-1">
                <span className="text-[#e87400]">©</span>
                <span>{new Date().getFullYear()}&nbsp;</span>
              </p>
            </div>
            <div className=" text-[15px] bg-gray-100 w-fit rounded-xl py-1 px-2  dark:text-[#fefefe]">
              <a className="flex items-center gap-1" href="mailto:k@kehinde.me">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  className="w-4 h-4 text-[#e87400]"
                >
                  <title>envelope</title>
                  <g fill="currentColor">
                    <path
                      d="m3,7l6.504,3.716c.307.176.685.176.992,0l6.504-3.716"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                    <rect
                      x="3"
                      y="4"
                      width="14"
                      height="12"
                      rx="3"
                      ry="3"
                      fill="none"
                      strokeWidth="2"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></rect>
                  </g>
                </svg>
                <span>Mail</span>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export { Layout }
