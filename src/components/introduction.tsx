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
          className="leading-[1.7em] text-primary text-4xl mt-[5px]  tracking-[-0.7px]"
        >
          Bonjour.
        </h1>
      </div>
      <div className="flex gap-5 max-w-[40rem] flex-col">
        <section className="px-0">
          <div className="flex flex-col text-[var(--gray-1)] gap-2">
            <div className="[&_p]:text-base [&_p]:leading-[1.65] [&_p]:my-4 md:[&_p]:my-2">
              <p>Programmer who likes design. I'm interested in design and systems engineering. A fan of accessibility on the web plus other forms of
                computing devices.

              Currently working a LSP in Rust for{' '}
              <a
                href="https://rcl-lang.org/"
                className="border-b border-primary text-primary"
              >
                RCL
              </a>{' '}
              and something <i>truly sensational</i> for Homer's Odyssey.
</p>
            </div>
          </div>
        </section>

        <A11ySection />

        <div className="flex gap-4 text-base md:gap-0 flex-col md:flex-row md:items-center justify-between">
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
        </div>
      </div>
    </PageWrapper>
  )
}
