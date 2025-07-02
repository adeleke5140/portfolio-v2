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
        <div className="flex w-full">
          <h1 className="text-[48px] mb-10 font-clash font-semibold flex-shrink-0 tracking-tighter">
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
    >
      <div className="flex gap-8 flex-col">
        <section className=" -mt-8 transition-[opacity,shadow] duration-300 rounded-2xl rounded-bl-sm px-0">
          <div className="flex flex-col text-[var(--gray-1)] gap-2 dark:border-[#282828] dark:bg-[#282828]">
            <div className="rounded-lg  dark:text-[#fefefe]">
              <p>
                Hi, I&apos;m{' '}
                <span className="font-clash font-medium">Kenny</span>. I like to
                call myself a design engineer because I enjoy building lovely
                interfaces that are pleasing to the eyes. I currently work at{' '}
                <a
                  href="https://www.mastra.ai"
                  className="border-b border-[#e87400]   text-[#e87400]"
                >
                  mastra.ai
                </a>{' '}
              </p>
            </div>

            <div>
              <p className="rounded-lg h-full">
                My work is my{' '}
                <span className="font-clash font-medium">craft</span>. A passion
                I am dedicated to because in part, it helps build me as a
                person. I am drawn to design because of beauty and I strive as a
                craftsman is to infuse every piece of work with joy and care.
              </p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <p className="font-medium text-lg">Projects</p>
          <div>
            <a
              style={{
                boxShadow:
                  '0px 0px 0px 1px #0000000f,0px 1px 2px -1px #0000000f,0px 2px 4px 0px #0000000a',
              }}
              target="_blank"
              href="https://chromewebstore.google.com/detail/nihongo-speech/jhojfellcdlldagfemimnjebnfoodchf?authuser=0&hl=en-GB"
              className="bg-white py-2 px-2 rounded-xl w-80 shadow grid-rows-[2fr,auto] gap-2 grid place-items-center"
            >
              <span className=" grid place-items-center min-h-[10rem] border border-[#f0f0f0] rounded-lg p-4 font-clash font-medium text-lg w-full bg-[#fcfcfc]">
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
          <p className="font-medium text-lg">Craft</p>
          <ul className="flex flex-col">
            <li>
              <Link
                href="/craft/tabs"
                className="hover:bg-gray-100 rounded-lg group w-full inline-flex justify-between px-1 py-4"
              >
                <span className="transition-transform inline-flex gap-1 items-center group-hover:translate-x-2">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.9 0.499976C13.9 0.279062 13.7209 0.0999756 13.5 0.0999756C13.2791 0.0999756 13.1 0.279062 13.1 0.499976V1.09998H12.5C12.2791 1.09998 12.1 1.27906 12.1 1.49998C12.1 1.72089 12.2791 1.89998 12.5 1.89998H13.1V2.49998C13.1 2.72089 13.2791 2.89998 13.5 2.89998C13.7209 2.89998 13.9 2.72089 13.9 2.49998V1.89998H14.5C14.7209 1.89998 14.9 1.72089 14.9 1.49998C14.9 1.27906 14.7209 1.09998 14.5 1.09998H13.9V0.499976ZM11.8536 3.14642C12.0488 3.34168 12.0488 3.65826 11.8536 3.85353L10.8536 4.85353C10.6583 5.04879 10.3417 5.04879 10.1465 4.85353C9.9512 4.65827 9.9512 4.34169 10.1465 4.14642L11.1464 3.14643C11.3417 2.95116 11.6583 2.95116 11.8536 3.14642ZM9.85357 5.14642C10.0488 5.34168 10.0488 5.65827 9.85357 5.85353L2.85355 12.8535C2.65829 13.0488 2.34171 13.0488 2.14645 12.8535C1.95118 12.6583 1.95118 12.3417 2.14645 12.1464L9.14646 5.14642C9.34172 4.95116 9.65831 4.95116 9.85357 5.14642ZM13.5 5.09998C13.7209 5.09998 13.9 5.27906 13.9 5.49998V6.09998H14.5C14.7209 6.09998 14.9 6.27906 14.9 6.49998C14.9 6.72089 14.7209 6.89998 14.5 6.89998H13.9V7.49998C13.9 7.72089 13.7209 7.89998 13.5 7.89998C13.2791 7.89998 13.1 7.72089 13.1 7.49998V6.89998H12.5C12.2791 6.89998 12.1 6.72089 12.1 6.49998C12.1 6.27906 12.2791 6.09998 12.5 6.09998H13.1V5.49998C13.1 5.27906 13.2791 5.09998 13.5 5.09998ZM8.90002 0.499976C8.90002 0.279062 8.72093 0.0999756 8.50002 0.0999756C8.2791 0.0999756 8.10002 0.279062 8.10002 0.499976V1.09998H7.50002C7.2791 1.09998 7.10002 1.27906 7.10002 1.49998C7.10002 1.72089 7.2791 1.89998 7.50002 1.89998H8.10002V2.49998C8.10002 2.72089 8.2791 2.89998 8.50002 2.89998C8.72093 2.89998 8.90002 2.72089 8.90002 2.49998V1.89998H9.50002C9.72093 1.89998 9.90002 1.72089 9.90002 1.49998C9.90002 1.27906 9.72093 1.09998 9.50002 1.09998H8.90002V0.499976Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Multi line exclusion tabs
                </span>
                <span className="border-dashed border-t relative top-3 w-1/2 inline-block"></span>
                <span className="text-sm text-ken-grey">2025</span>
              </Link>
            </li>
          </ul>
        </section>

        <section className="flex flex-col gap-4">
          <p className="font-medium text-lg">Writing</p>
          <ul className="flex flex-col">
            <li>
              <Link
                href="/blog/what-is-motion"
                className="hover:bg-gray-100 rounded-lg group w-full inline-flex justify-between px-1 py-4"
              >
                <span className="transition-transform inline-flex gap-1 items-center group-hover:translate-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                  >
                    <title>feather</title>
                    <g fill="currentColor">
                      <path
                        d="m14.451,9.699c-.513,3.998-3.934,4.571-7.451,4.003"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.2"
                      ></path>
                      <path
                        d="m3,17s1.469-12.904,14-14c-.627,1.093-.642,2.918-1.06,4.748-.587,2.252-2.615,2.532-5.1,2.532"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.2"
                      ></path>
                    </g>
                  </svg>
                  What is the purpose of motion?
                </span>
                <span className="border-dashed border-t relative top-3 w-1/2 inline-block"></span>
                <span className="text-sm text-ken-grey">2025</span>
              </Link>
            </li>
          </ul>
        </section>

        <A11ySection />
      </div>
    </PageWrapper>
  )
}
