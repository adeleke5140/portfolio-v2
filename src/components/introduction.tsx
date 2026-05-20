'use client'
import { PageWrapper } from '@/components/page-wrapper'
import Image from 'next/image'
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
          className="leading-[1.7em] text-[40px] mt-[5px]  tracking-[-0.96px]"
        >
          Bonjour.
        </h1>
      </div>
      <div className="flex gap-5 max-w-[40rem] flex-col">
        <section className="px-0">
          <div className="flex flex-col text-[var(--gray-1)] gap-2">
            <div>
              <p className="text-base leading-[1.65] my-4">
                I like computers which means I have an interest in knowing how they work and how to wield them masterfully. I thought Design engineering was my calling but nowadays, I think it's systems. All forms of systems underpinning modern software.
              </p>
              <p className="text-base leading-[1.65] my-4">
                I am a big fan of accessibility both on the web and on other forms of computing devices.
              </p>

              <p className="text-base my-4 leading-[1.65]">
                I am currently building a LSP in Rust for {" "}
                <a
                  href="https://rcl-lang.org/"
                  className="border-b border-primary text-primary"
                >
                  RCL
                </a> and learning bash.
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
                className="capitalize text-ken-grey hover:underline first:-ml-3 justify-between group flex gap-1.5 items-center px-3 py-1 rounded-xl"
                rel="external"
                referrerPolicy="strict-origin"
              >
                {con.name}
              </a>
            ))}
          </div>
          <p className="text-ken-grey text-base">
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </PageWrapper>
  )
}
