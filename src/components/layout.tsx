
interface LayoutProps {
  children: React.ReactNode
}


const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="flex relative  h-full pt-8 pb-8 min-h-screen flex-col ">
        <main className="pt-10 h-full flex-1 md:pt-12 place-items-center w-full'">
          {children}
        </main>
        <footer className="w-full mt-10 mb-2 md:px-6 ">
          <div className="max-w-xl rounded-md md:px-6 mx-auto">
            <div className="px-6 py-3 text-[15px] md:px-0 md:pb-2 flex justify-between">
              <p className="text-sm">ltb.</p>
              <p className="text-sm">&copy;{new Date().getFullYear()}&nbsp;</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export { Layout }
