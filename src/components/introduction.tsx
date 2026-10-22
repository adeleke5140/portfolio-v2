import { PageWrapper } from '@/components/page-wrapper'
import { A11ySection } from './home/a11y-section'

export const Introduction = () => {
  return (
    <PageWrapper showHeading heading={''}>
      <div className="flex gap-5 max-w-[30rem] mx-auto flex-col">
        <h1
          style={{
            textWrap: 'pretty',
          }}
          className="leading-[1.7em] text-primary text-xl mt-[5px]"
        >
          Bonjour.
        </h1>
        <div className="flex flex-col text-[var(--gray-1)] gap-2">
          <div className="[&_p]:text-base [&_p]:leading-[1.6] [&_p]:pt-4 ">
            <p>
              Hi, I'm Kehinde. I like programming and design. I am also an
              advocate for web accessibility.
            </p>
            <p className="[&_a]:text-primary [&_a]:border-b [&_a]:border-primary">
              <span className="text-primary">links: </span>
              <ul className='flex flex-col gap-1'>
                <li>
                  <a
                    href="https://github.com/adeleke5140"
                    className="underline"
                  >
                    github
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/adeleke5140/"
                    className="underline"
                  >
                    linkedIn
                  </a>
                </li>
                <li>
                  <a href="mailto:k@kehinde.me" className="underline">
                    mail
                  </a>
                </li>

                <li>
                  <a href={`/blog`} className="underline">
                    blog
                  </a>
                </li>
              </ul>
            </p>
          </div>
        </div>
        <A11ySection />
      </div>
    </PageWrapper>
  )
}
