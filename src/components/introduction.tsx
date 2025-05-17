'use client'
import { craft } from '@/components/navigation/navigation'
import { PageWrapper } from '@/components/pageWrapper'
import { ProfileShine } from '@/components/profile-shine/profile-shine'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'

import Link from 'next/link'
import React from 'react'
export const Introduction = () => {
  const TITLE = 'Design Engineer'
  return (
    <PageWrapper
      showHeading
      heading={
        <div className="flex w-full justify-between flex-row-reverse">
          <ProfileShine classname="mx-0" />
          <h1 className="text-xl font-medium tracking-tighter">
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
      <motion.section className="card bg-[#fafafa] rounded-2xl p-4">
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-col text-[var(--gray-1)] text-[15px] gap-2 dark:border-[#282828] dark:bg-[#282828]"
        >
          <motion.div className="rounded-lg text-[15px] dark:text-[#fefefe]">
            <p>
              Hi, I&apos;m Kenny. I am web craftsman with interest in typefaces,
              design and motion. I currently work at{' '}
              <a href="https://www.mastra.ai" className="border-b border-black">
                mastra.ai
              </a>
            </p>
          </motion.div>

          <motion.div>
            <p className="dark:text-[#fefefe] text-[15px] rounded-lg h-full">
              I am drawn to design because of beauty. The beauty of how
              typefaces and animation can be used to tell stories. The infinite
              is the well I draw from.
            </p>
          </motion.div>

          <div>
            Check out my{' '}
            <Link
              className="border-b border-black gap-1 inline-flex items-center"
              href="/craft"
            >
              <span>Craft</span> <span>{craft}</span>
            </Link>{' '}
            <span> and </span>
            <Link
              className="border-b border-black inline-flex gap-1 items-center"
              href={'/blog'}
            >
              <span>Blog </span>
              <motion.svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 21C5 12.2792 8.29485 3.55839 18.0725 3.00155C18.627 2.96997 19.0862 3.42569 18.9862 3.96975C18.3434 7.46729 14.5532 9.98373 14.5532 9.98373L15.9986 11.0634C16.338 11.3169 16.479 11.7528 16.2992 12.1355C15.5251 13.7832 12.8684 17.9956 5.93856 17.9956"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </motion.svg>
            </Link>
          </div>
        </motion.div>
      </motion.section>

      <section className="mt-4 flex  items-center gap-4">
        <NowPlayingSection />
        <A11ySection />
      </section>
    </PageWrapper>
  )
}

const A11ySection = () => {
  return (
    <div className="bg-[#fafafa] w-full card rounded-xl  px-3 py-1 text-sm flex gap-1.5 items-center h-20">
      <nav className="flex flex-col gap-2" aria-labelledby="a11y-webring-club">
        <p>
          This site is a member of the{' '}
          <a
            className=" border-b border-black"
            rel="external"
            href="https://a11y-webring.club/"
          >
            a11y-webring.club
          </a>
          .
        </p>
        <ul className="flex  gap-2">
          <li className="">
            <a
              className=" bg-gray-100 card justify-between group flex gap-1.5 text-[15px] items-center px-3 py-1 rounded-2xl"
              rel="external"
              referrerPolicy="strict-origin"
              href="https://a11y-webring.club/prev"
            >
              Previous
              <ArrowUpRight
                size={12}
                aria-hidden
                className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
              />
            </a>
          </li>
          <li className="">
            <a
              className=" bg-gray-100 card justify-between group px-3 flex gap-1.5 items-center text-[15px] py-1 rounded-2xl"
              rel="external"
              referrerPolicy="strict-origin"
              href="https://a11y-webring.club/random"
            >
              Random
              <ArrowUpRight
                size={12}
                aria-hidden
                className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
              />
            </a>
          </li>
          <li className="">
            <a
              className=" bg-gray-100 card justify-between group flex gap-1.5 items-center px-3 text-[15px] py-1 rounded-2xl"
              rel="external"
              referrerPolicy="strict-origin"
              href="https://a11y-webring.club/next"
            >
              Next
              <ArrowUpRight
                size={12}
                aria-hidden
                className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
              />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

const NowPlayingSection = () => {
  return (
    <div className="bg-white relative flex items-center rounded-xl card text-sm gap-1.5  h-20 w-1/4 font-mono">
      <svg
        id="play"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-5 h-5 mx-auto"
      >
        <path
          stroke="#fafafa"
          d="m21,11v-1h-1v-1h-2v-1h-2v-1h-1v-1h-2v-1h-2v-1h-1v-1h-2v-1h-2v-1h-3v1h-1v20h1v1h3v-1h2v-1h2v-1h1v-1h2v-1h2v-1h1v-1h2v-1h2v-1h1v-1h1v-2h-1Zm-2,2h-2v1h-2v1h-1v1h-2v1h-2v1h-1v1h-2v1h-2v1h-1V3h1v1h2v1h2v1h1v1h2v1h2v1h1v1h2v1h2v2Z"
        />
      </svg>
      {/* <span className=" block w-full rounded-lg p-2 max-w-full bg-gray-100  left-2 text-xs card m-1 bottom-0">
          WIP
        </span> */}
    </div>
  )
}
