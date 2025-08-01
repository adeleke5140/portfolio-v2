interface RootLayoutProps {
  children: React.ReactNode
}

export const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <>
      <div className="relative flex flex-col min-h-screen pb-8">
        <div
          aria-hidden="true"
          className="fixed top-0 min-w-[1000px] z-10 h-20 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.15] pointer-events-none"
        />
        <main className="pt-10 md:pt-12 flex-1 w-full">{children}</main>
        <footer className="w-full mt-10 mb-2 px-6 mx-auto max-w-[680px]">
          <div className="rounded-md flex justify-between items-center">
            <div className="py-1 px-2 text-[15px] flex justify-between">
              <p className="text-sm inline-flex items-center gap-1">
                <span className="text-[#e87400]">©</span>
                <span>{new Date().getFullYear()}&nbsp;</span>
              </p>
            </div>
            <div className="text-[15px] w-fit  py-1 px-2  dark:text-[#fefefe]">
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
