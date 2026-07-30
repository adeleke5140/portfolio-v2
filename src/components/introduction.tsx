'use client'
import { PageWrapper } from '@/components/page-wrapper'
import { A11ySection } from './home/a11y-section'

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
            <div className="[&_p]:text-base [&_p]:leading-[1.65] [&_p]:pt-4 ">
              <p>Programmer who likes design. I'm interested in design and systems engineering. A fan of accessibility on the web plus other forms of
                computing devices.
              </p>
              <p>
                Currently working a LSP in Rust for{' '}
                <a
                  href="https://rcl-lang.org/"
                  className="border-b border-primary text-primary"
                >
                  RCL
                </a>{' '}
                and something <i>truly sensational</i> for Homer's Odyssey.
              </p>
              <p className='[&_a]:text-primary [&_a]:border-b [&_a]:border-primary'>
                You can find me on <a href='https://github.com/adeleke5140'>Github</a>, <a href='https://www.linkedin.com/in/adeleke5140/'>LinkedIn</a> or, send me a <a href='mailto:k@kehinde.me'>mail</a>.
              </p>
            </div>
          </div>
        </section>

        <A11ySection />
      </div>
    </PageWrapper>
  )
}
