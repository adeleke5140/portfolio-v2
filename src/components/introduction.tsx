'use client'
import { PageWrapper } from '@/components/page-wrapper'
import { A11ySection } from './home/a11y-section'

const connection = [
  {
    name: 'email',
    value: 'mailto:k@kehinde.me',
  },
  {
    name: 'github',
    value: 'https://github.com/adeleke5140',
  },
  {
    name: 'linkedin',
    value: 'https://www.linkedin.com/in/adeleke5140/',
  },
]

export const Introduction = () => {
  return (
    <PageWrapper showHeading heading={''}>
      <div className="pt-20">
        <h1
          style={{
            textWrap: 'pretty',
          }}
          className="leading-[1.7em] text-primary text-[40px] mt-[5px]  tracking-[-0.96px]"
        >
          Bonjour.
        </h1>
      </div>
      <div className="flex gap-5 max-w-[40rem] flex-col">
        <section className="px-0">
          <div className="flex flex-col text-[var(--gray-1)] gap-2">
            <div className="[&_p]:text-base [&_p]:leading-[1.65] [&_p]:my-2">
              <p>Programmer who likes design and systems engineering.</p>
              <p>
                I am a big fan of accessibility on the web and on other forms of
                computing devices.
              </p>

              <p>
                I am currently building a LSP in Rust for{' '}
                <a
                  href="https://rcl-lang.org/"
                  className="border-b border-primary text-primary"
                >
                  RCL
                </a>{' '}
                and reading a book on bash.
              </p>
            </div>
          </div>
        </section>

        <A11ySection />

        <div className="flex gap-4 md:gap-0 flex-col md:flex-row md:items-center justify-between">
          <div className="flex">
            {connection.map((con) => (
              <a
                key={con.name}
                target="_blank"
                href={con.value}
                className="capitalize hover:underline first:-ml-3 justify-between group flex gap-1.5 items-center px-3 py-1 rounded-xl"
                rel="external"
                referrerPolicy="strict-origin"
              >
                {con.name}
              </a>
            ))}
          </div>
          <p className="text-base">© {new Date().getFullYear()}</p>
        </div>
      </div>
    </PageWrapper>
  )
}
