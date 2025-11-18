'use client'
import { PageWrapper } from '@/components/page-wrapper'
import { A11ySection } from './home/a11y-section'
import Link from 'next/link'

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
    <PageWrapper
      showHeading
      heading={
        <div className="py-8 pb-4">
          <h1 className="text-[48px] font-medium lg:text-5xl lg:tracking-[-0.06em] lg:leading-[1.2em] font-serif tracking-tighter">
            Kehinde Adeleke
          </h1>
          <nav className="flex cursor-pointer items-center py-5">
            <Link
              href="/craft"
              className="text-ken-grey -ml-3 px-3 py-1 rounded-xl "
            >
              Craft
            </Link>
            <Link href="/blog" className="text-ken-grey px-3 py-1 rounded-xl ">
              Blog
            </Link>
          </nav>
        </div>
      }
    >
      <div className="flex gap-10  max-w-[40rem] flex-col">
        <section className="px-0">
          <div className="flex flex-col text-[var(--gray-1)] gap-2 dark:border-[#282828] dark:bg-[#282828]">
            <div className="rounded-lg  dark:text-[#fefefe]">
              <p>
                Hi, I'm Kenny. When I was eight, I wanted to be an artist, the
                closest thing to that right now is a design engineer.
              </p>
            </div>

            <div>
              <p>
                My craft builds me as a person and I strive to infuse every
                piece of work with care. I currently work on the Docs and
                Website team at{' '}
                <a
                  href="https://www.mastra.ai"
                  className="underline decoration-[#e87400]   text-[#e87400]"
                >
                  mastra.ai
                </a>{' '}
              </p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <p className="font-medium text-ken-grey font-serif">Socials</p>
          <div className="flex gap-2">
            {connection.map((con) => (
              <a
                target="_blank"
                href={con.value}
                className="capitalize  hover:underline first:-ml-3 justify-between group flex gap-1.5 text-[15px] items-center px-3 py-1 rounded-xl"
                rel="external"
                referrerPolicy="strict-origin"
              >
                {con.name}
              </a>
            ))}
          </div>
        </section>

        <A11ySection />
      </div>
    </PageWrapper>
  )
}
