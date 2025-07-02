export const A11ySection = () => {
  return (
    <div className="px-0 w-full py-1 flex gap-1.5 items-center h-20">
      <nav className="flex flex-col gap-3" aria-labelledby="a11y-webring-club">
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
        <ul className="flex gap-2">
          <li className="">
            <a
              className=" bg-gray-100 justify-between group flex gap-1.5 text-[15px] items-center px-3 py-1 rounded-xl"
              rel="external"
              referrerPolicy="strict-origin"
              href="https://a11y-webring.club/prev"
            >
              Previous
            </a>
          </li>
          <li className="">
            <a
              className=" bg-gray-100 justify-between group px-3 flex gap-1.5 items-center text-[15px] py-1 rounded-xl"
              rel="external"
              referrerPolicy="strict-origin"
              href="https://a11y-webring.club/random"
            >
              Random
            </a>
          </li>
          <li className="">
            <a
              className=" bg-gray-100 justify-between group flex gap-1.5 items-center px-3 text-[15px] py-1 rounded-xl"
              rel="external"
              referrerPolicy="strict-origin"
              href="https://a11y-webring.club/next"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
