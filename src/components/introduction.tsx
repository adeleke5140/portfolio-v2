'use client'
import { PageWrapper } from '@/components/pageWrapper'
import Link from 'next/link'
import React from 'react'
import { A11ySection } from './home/a11y-section'

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
                <span
                  className="letter"
                  style={{ '--index': index } as React.CSSProperties}
                >
                  {letter}
                </span>
                {index === 5 ? ' ' : null}
              </React.Fragment>
            ))}
          </h1>
        </div>
      }
      classname="max-w-none"
    >
      <div className="flex gap-16 pt-8 max-w-[40rem] flex-col">
        <section className="px-0">
          <div className="flex flex-col text-[var(--gray-1)] gap-2 dark:border-[#282828] dark:bg-[#282828]">
            <div className="rounded-lg  dark:text-[#fefefe]">
              <p className="text-[17px]">
                Hi, I&apos;m <span className="font-medium">Kenny,</span> a
                design engineer. I enjoy building beautiful and accessible
                software. I currently work at{' '}
                <a
                  href="https://www.mastra.ai"
                  className="border-b border-[#e87400]   text-[#e87400]"
                >
                  mastra.ai
                </a>{' '}
              </p>
            </div>

            <div>
              <p className="rounded-lg h-full text-[17px]">
                My work is my <span className="font-medium">craft</span>. A
                passion I am dedicated to because it builds me as a person. I
                strive as a craftsman to infuse every piece of work with delight
                and care.
              </p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <p className="font-medium text-[17px]">Currently Building:</p>
          <div>
            <a
              // style={{
              //   boxShadow:
              //     '0px 0px 0px 1px #0000000f,0px 1px 2px -1px #0000000f,0px 2px 4px 0px #0000000a',
              // }}
              target="_blank"
              href="https://chromewebstore.google.com/detail/nihongo-speech/jhojfellcdlldagfemimnjebnfoodchf?authuser=0&hl=en-GB"
              className="bg-white inline-block py-2 px-2 rounded-xl w-full"
            >
              <span className="flex items-center border border-[#f0f0f0] rounded-lg p-4 font-medium text-lg w-full bg-[#fcfcfc]">
                <span className="flex justify-self-start px-3 py-2 flex-col gap-0.5">
                  <span className=" inline-block">Hanashi</span>
                  <span className="text-sm text-ken-grey ">
                    Dynamic japanese readings with AI Voices
                  </span>
                </span>
              </span>
            </a>
          </div>
        </section>

        <A11ySection />
      </div>
    </PageWrapper>
  )
}
