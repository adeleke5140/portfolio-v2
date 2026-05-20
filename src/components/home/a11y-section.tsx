export const A11ySection = () => {
  return (
    <div className="px-0 w-full border-y border-[#dcdcdc7e] py-10 flex gap-1.5 items-center">
      <nav className="flex flex-col gap-3" aria-labelledby="a11y-webring-club">
        <p className="text-base">
          This site is a member of the{' '}
          <a
            className="text-primary border-b border-primary"
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
              className="hover:underline  justify-between group flex gap-1.5 items-center px-3 py-1 -ml-2 rounded-xl"
              rel="external"
              referrerPolicy="strict-origin"
              href="https://a11y-webring.club/prev"
            >
              Previous
            </a>
          </li>
          <li className="">
            <a
              className="hover:underline  justify-between group px-3 flex gap-1.5 items-center py-1 rounded-xl"
              rel="external"
              referrerPolicy="strict-origin"
              href="https://a11y-webring.club/random"
            >
              Random
            </a>
          </li>
          <li className="">
            <a
              className="hover:underline  justify-between group flex gap-1.5 items-center px-3 py-1 rounded-xl"
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
