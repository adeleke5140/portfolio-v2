'use client'
import { PageWrapper } from '@/components/page-wrapper'
import { A11ySection } from './home/a11y-section'
import Link from 'next/link'
import Image from 'next/image'

const connection = [
  {
    name: 'email',
    value: 'mailto:k@kehinde.me',
  },
  {
    name: 'twitter',
    value: 'https://twitter.com/adeleke5140',
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
      <div className="pt-20 pb-8 border-b border-[#dcdcdc7e]">
        <Image
          src="/ken-with-noise.png"
          alt="Kehinde Adeleke"
          width={400}
          height={400}
          className="rounded-full w-[10rem] h-[10rem]"
        />
      </div>
      <div className="flex gap-10 max-w-[40rem] flex-col">
        <section className="px-0">
          <div className="flex flex-col text-[var(--gray-1)] gap-2 dark:border-[#282828] dark:bg-[#282828]">
            <div>
              <p className="text-lg  my-4">
                I am a Design engineer working across design and engineering.
              </p>

              <p className="text-lg my-4">
                I am regulary thinking about typography, animations, design and
                how typography can add texture to web experiences.
              </p>

              <p className="text-lg my-4">
                My craft builds me as a person and I strive to infuse every
                piece of work with care. I currently works on the Docs and
                Website team at{' '}
                <a
                  href="https://www.mastra.ai"
                  className="underline decoration-primary text-primary"
                >
                  mastra.ai
                </a>{' '}
              </p>
            </div>
          </div>
        </section>

        <A11ySection />

        <div className="flex gap-4  md:gap-0 flex-col md:flex-row md:items-center justify-between">
          <div className="flex">
            {connection.map((con) => (
              <a
                key={con.name}
                target="_blank"
                href={con.value}
                className="capitalize text-ken-grey hover:underline first:-ml-3 justify-between group flex gap-1.5 text-[17.5px] items-center px-3 py-1 rounded-xl"
                rel="external"
                referrerPolicy="strict-origin"
              >
                {con.name}
              </a>
            ))}
          </div>
          <p className="text-ken-grey text-[17.5px]">
            © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </PageWrapper>
  )
}
