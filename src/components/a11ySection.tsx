const A11ySection = () => {
  return (
    <section className="px-6">
      <nav className="flex flex-col gap-6" aria-labelledby="a11y-webring-club">
        <h2 id="a11y-webring-club" className=" text-sm">
          a11y-webring.club
        </h2>
        <p>
          This site is a member of the{' '}
          <a
            className=" underline underline-offset-2"
            rel="external"
            href="https://a11y-webring.club/"
          >
            a11y-webring.club
          </a>
          .
        </p>
        <ul className="flex list-disc flex-col pl-8">
          <li>
            <a
              className="underline"
              rel="external"
              referrerPolicy="strict-origin"
              href="https://a11y-webring.club/prev"
            >
              Previous website
            </a>
          </li>
          <li>
            <a
              className="underline"
              rel="external"
              referrerPolicy="strict-origin"
              href="https://a11y-webring.club/random"
            >
              Random website
            </a>
          </li>
          <li>
            <a
              className="underline"
              rel="external"
              referrerPolicy="strict-origin"
              href="https://a11y-webring.club/next"
            >
              Next website
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export { A11ySection };
