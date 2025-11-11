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
  const TITLE = 'Design Engineer'
  return (
    <PageWrapper
      showHeading
      heading={
        <div className="flex w-full border-b-[0.5px]  relative overflow-y-clip  border-b-[#dcdcdc] py-8">
          <h1 className="text-[48px] font-medium lg:text-7xl lg:tracking-[-0.06em] lg:leading-[1.2em] font-serif tracking-tighter">
            {TITLE.split('').map((letter, index) => (
              <React.Fragment key={index + 'title'}>
                <motion.span
                  className="inline"
                  initial={{
                    y: 20,
                  }}
                >
                  {letter}
                </motion.span>
                {index === 5 ? ' ' : null}
              </React.Fragment>
            ))}
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
                where I strive to build beautiful and accessible software.
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
          <div className="flex flex-col gap-2">
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
            <a
              href="/alfred"
              className="inline-block group w-full"
            >
              <span className="flex justify-self-start flex-col gap-1">
                <span className="bg-[#6B46C1] border-4 border-black text-white group-hover:bg-[#7C3AED] transition-all justify-between group flex gap-2 text-[15px] items-center px-3 py-2 font-mono font-bold"
                  style={{ imageRendering: 'pixelated' }}
                >
                  <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="14" y="2" width="4" height="4" fill="currentColor"/>
                    <rect x="8" y="8" width="16" height="12" fill="currentColor"/>
                    <rect x="12" y="12" width="4" height="4" fill="#000"/>
                    <rect x="20" y="12" width="4" height="4" fill="#000"/>
                    <rect x="10" y="20" width="12" height="8" fill="currentColor"/>
                  </svg>
                  ALFRED.EXE
                </span>
                <span className="text-xs text-gray-600 px-3 font-mono">
                  &gt; AI COFOUNDER FOR SLACK + LINEAR
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
