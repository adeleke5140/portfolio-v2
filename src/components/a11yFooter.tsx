const A11yFooter = () => {
  return (
    <footer className="absolute bottom-0">
      <nav
        class="font-mono text-sm a11y-webring-club"
        aria-labelledby="a11y-webring-club"
      >
        <h2 id="a11y-webring-club font-extrabold">a11y-webring.club</h2>
        <p>
          This site is a member of the{" "}
          <a rel="external" href="https://a11y-webring.club/">
            a11y-webring.club
          </a>
          .
        </p>
        <ul className="flex gap-4">
          <li>
            <a
              className="text-link-color opacity-70 font-extrabold hover:opacity-100 origin-left transition-transform-opacity ease-out duration-200 hover:scale-110 hover:translate-x-1 hover:-translate-y-0.5 focus:outline-none rounded focus:ring focus:ring-heading-color"
              rel="external"
              referrerpolicy="strict-origin"
              href="https://a11y-webring.club/prev"
            >
              Previous website
            </a>
          </li>
          <li>
            <a
              className="text-link-color opacity-70 font-extrabold hover:opacity-100 origin-left transition-transform-opacity ease-out duration-200 hover:scale-110 hover:translate-x-1 hover:-translate-y-0.5 focus:outline-none rounded focus:ring focus:ring-heading-color"
              rel="external"
              referrerpolicy="strict-origin"
              href="https://a11y-webring.club/random"
            >
              Random website
            </a>
          </li>
          <li>
            <a
              className="text-link-color opacity-70 font-extrabold hover:opacity-100 origin-left transition-transform-opacity ease-out duration-200 hover:scale-110 hover:translate-x-1 hover:-translate-y-0.5 focus:outline-none rounded focus:ring focus:ring-heading-color"
              rel="external"
              referrerpolicy="strict-origin"
              href="https://a11y-webring.club/next"
            >
              Next website
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export { A11yFooter };
