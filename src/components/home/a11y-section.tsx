import { ArrowUpRight } from 'lucide-react'

export const A11ySection = () => {
  return (
    <div className="bg-[#fafafa] w-full card rounded-xl  px-3 py-1 text-sm flex gap-1.5 items-center h-20">
      <nav className="flex flex-col gap-2" aria-labelledby="a11y-webring-club">
        <p>
          This site is a member of the{' '}
          <a
            className="text-[#e87400] border-b border-[#e87400]  "
            rel="external"
            href="https://a11y-webring.club/"
          >
            a11y-webring.club
          </a>
          .
        </p>
        <ul className="flex  gap-2">
          <li className="">
            <a
              className=" bg-gray-100 card justify-between group flex gap-1.5 text-[15px] items-center px-3 py-1 rounded-2xl"
              rel="external"
              referrerPolicy="strict-origin"
              href="https://a11y-webring.club/prev"
            >
              Previous
              <ArrowUpRight
                size={12}
                aria-hidden
                className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
              />
            </a>
          </li>
          <li className="">
            <a
              className=" bg-gray-100 card justify-between group px-3 flex gap-1.5 items-center text-[15px] py-1 rounded-2xl"
              rel="external"
              referrerPolicy="strict-origin"
              href="https://a11y-webring.club/random"
            >
              Random
              <ArrowUpRight
                size={12}
                aria-hidden
                className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
              />
            </a>
          </li>
          <li className="">
            <a
              className=" bg-gray-100 card justify-between group flex gap-1.5 items-center px-3 text-[15px] py-1 rounded-2xl"
              rel="external"
              referrerPolicy="strict-origin"
              href="https://a11y-webring.club/next"
            >
              Next
              <ArrowUpRight
                size={12}
                aria-hidden
                className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
              />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
