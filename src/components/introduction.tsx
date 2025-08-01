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
        <div className="flex w-full border-y-[0.5px]  border-y-[#dcdcdc] py-8">
          <h1 className="text-[48px] lg:font-medium lg:text-7xl lg:tracking-[-0.06em] lg:leading-[1.2em] font-inter font-semibold flex-shrink-0 tracking-tighter">
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
      {/* <div className="flex gap-16 pt-8 max-w-[40rem] mx-auto flex-col">
        <section className="px-0">
          <div className="flex flex-col text-[var(--gray-1)] gap-2 dark:border-[#282828] dark:bg-[#282828]">
            <div className="rounded-lg  dark:text-[#fefefe]">
              <p className="text-[17px]">
                Hi, I&apos;m <span className="font-medium">Kenny</span>. I am a
                design engineer. I enjoy building beautiful and accessible
                software and currently work at{' '}
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
                passion I am dedicated to because in part, it helps build me as
                a person. I am drawn to design because of beauty and I strive as
                a craftsman to infuse every piece of work with delight and care.
              </p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <p className="font-medium text-[17px]">Projects</p>
          <div>
            <a
              style={{
                boxShadow:
                  '0px 0px 0px 1px #0000000f,0px 1px 2px -1px #0000000f,0px 2px 4px 0px #0000000a',
              }}
              target="_blank"
              href="https://chromewebstore.google.com/detail/nihongo-speech/jhojfellcdlldagfemimnjebnfoodchf?authuser=0&hl=en-GB"
              className="bg-white py-2 px-2 rounded-xl first-of-type:w-full lg:w-80 lg:first-of-type:w-80 shadow grid-rows-[2fr,auto] gap-2 grid place-items-center"
            >
              <span className=" grid place-items-center min-h-[10rem] border border-[#f0f0f0] rounded-lg p-4 font-inter font-medium text-lg w-full bg-[#fcfcfc]">
                <button
                  type="button"
                  className="flex preview-button items-center justify-center w-8 h-8 rounded-full  transition-colors"
                >
                  <svg
                    className="shrink-0"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    role="img"
                    focusable="false"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m5.604 2.41 7.23 4.502a1.375 1.375 0 0 1-.02 2.345L5.585 13.6a1.375 1.375 0 0 1-2.083-1.18V3.576A1.375 1.375 0 0 1 5.604 2.41Z" />
                  </svg>
                </button>
              </span>
              <span className="flex justify-self-start px-3 py-2 flex-col gap-0.5">
                <span className=" inline-block"> Nihongo Speech</span>
                <span className="text-sm text-ken-grey ">
                  Convert Japanese language to audio
                </span>
              </span>
            </a>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <p className="font-medium text-[17px]">Craft</p>
          <ul className="flex flex-col">
            <li>
              <Link
                href="/craft/tabs"
                className="hover:bg-gray-100 rounded-lg group w-full inline-flex justify-between px-1 py-4"
              >
                <span className="transition-transform inline-flex gap-1 items-center group-hover:translate-x-2">
                  Multi line exclusion tabs
                </span>
                <span className="border-dashed border-t relative top-3 w-1/4 lg:w-1/2 inline-block"></span>
                <span className="text-sm text-ken-grey">2025</span>
              </Link>
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-4">
          <p className="font-medium text-lg lg:text-xl">Writing</p>
          <ul className="flex flex-col">
            <li>
              <Link
                href="/blog/what-is-motion"
                className="hover:bg-gray-100 rounded-lg group w-full inline-flex justify-between px-1 py-4"
              >
                <span className="transition-transform inline-flex gap-1 items-center group-hover:translate-x-2">
                  Motion on the web
                </span>
                <span className="border-dashed border-t relative top-3 w-1/4 lg:w-1/2 inline-block"></span>
                <span className="text-sm text-ken-grey">2025</span>
              </Link>
            </li>
          </ul>
        </section>

        <A11ySection />
      </div> */}
    </PageWrapper>
  )
}
