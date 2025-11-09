'use client'
import { PageWrapper } from '@/components/pageWrapper'
import React from 'react'
import { A11ySection } from './home/a11y-section'
import { motion } from 'motion/react'

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
        <div className="flex w-full border-b-[0.5px]  relative overflow-y-clip  border-b-[#dcdcdc] py-8">
          <h1 className="text-[48px] font-medium lg:text-7xl lg:tracking-[-0.06em] lg:leading-[1.2em] font-serif tracking-tighter">
            Design Engineer
          </h1>
        </div>
      }
      classname="max-w-none"
    >
      <div className="flex gap-10 pt-8 max-w-[40rem] flex-col">
        <section className="px-0">
          <div className="flex flex-col text-[var(--gray-1)] gap-2 dark:border-[#282828] dark:bg-[#282828]">
            <div className="rounded-lg  dark:text-[#fefefe]">
              <p className="text-[17px]">
                Hi, I'm <span className="font-medium">Kenny.</span> When I was
                eight, I wanted to be an artist, the closest thing to that right
                now is a design engineer. I currently work at{' '}
                <a
                  href="https://www.mastra.ai"
                  className="border-b border-[#e87400]   text-[#e87400]"
                >
                  mastra.ai
                </a>{' '}
                on the Docs team.
              </p>
            </div>

            <div>
              <p className="rounded-lg h-full text-[17px]">
                My work is my <span className="font-medium">craft</span>. A
                passion I am dedicated to because it also builds me as a person.
                I strive to infuse every piece of work with care.
              </p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <p className="font-medium text-[17px]">Building</p>
          <p>
            I am an active japanese learner so I am working on software to make
            learning it easier. You can check it out below.
          </p>
          <div>
            <a
              target="_blank"
              href="https://chromewebstore.google.com/detail/nihongo-speech/jhojfellcdlldagfemimnjebnfoodchf?authuser=0&hl=en-GB"
              className="inline-block group rounded-xl w-full"
            >
              <span className="flex justify-self-start flex-col gap-0.5">
                <span className=" bg-gray-100 group-hover:underline justify-between group flex gap-1.5 text-[15px] items-center px-3 py-1 rounded-xl">
                  Hanashi
                </span>
              </span>
            </a>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <p className="font-medium text-[17px]">Connect</p>
          <div className="flex gap-2">
            {connection.map((con) => (
              <a
                target="_blank"
                href={con.value}
                className="capitalize  hover:underline bg-gray-100 justify-between group flex gap-1.5 text-[15px] items-center px-3 py-1 rounded-xl"
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
