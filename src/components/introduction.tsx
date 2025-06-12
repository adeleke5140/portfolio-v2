'use client'
import { PageWrapper } from '@/components/pageWrapper'
import { ProfileShine } from '@/components/profile-shine/profile-shine'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { useState } from 'react'
import { A11ySection } from './home/a11y-section'

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
      <section
        className={cn(
          'bg-white transition-opacity duration-300 rounded-2xl rounded-bl-sm p-4'
        )}
      >
        <div className="flex flex-col text-[var(--gray-1)] text-[15px] gap-2 dark:border-[#282828] dark:bg-[#282828]">
          <div className="rounded-lg text-[15px] dark:text-[#fefefe]">
            <p>
              Hi, I&apos;m Kenny. I am web craftsman so I care about the
              products that I build. My craft is very dear to me. I currently
              work at{' '}
              <a
                href="https://www.mastra.ai"
                className="border-b border-[#e87400]   text-[#e87400]"
              >
                mastra.ai
              </a>
            </p>
          </div>

          <div>
            <p className="dark:text-[#fefefe] text-[15px] rounded-lg h-full">
              I am drawn to design because of beauty. Beauty compels people to
              use products. One thing I think about often is beautiful and
              joyful design can be used to tell stories.
            </p>
          </div>
        </div>
      </section>

      <div className="my-2 flex justify-start">
        <Link
          className=" bg-gray-100 rounded-2xl rounded-l-sm w-1/4 py-3 px-4  gap-1 inline-flex items-center"
          href="/blog"
        >
          <span className="text-[15px]">Blog</span>
        </Link>{' '}
      </div>
      <div className="my-2 flex  justify-start">
        <Link
          className=" bg-white rounded-2xl rounded-tl-sm w-1/2 py-3 px-4  gap-1 inline-flex items-center"
          href={'/craft'}
        >
          <span className="text-[15px]">Craft</span>
        </Link>
      </div>

      <section className=" flex justify-start">
        {/* <NowPlayingSection
          showVariant={showVariant}
          setShowVariant={setShowVariant}
        /> */}
      </section>
      <A11ySection />
      {/* <AnimatePresence>
        {showVariant ? (
          <GridLayout
            showVariant={showVariant}
            setShowVariant={setShowVariant}
          />
        ) : null}
      </AnimatePresence> */}
    </PageWrapper>
  )
}
