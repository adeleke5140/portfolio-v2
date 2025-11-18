'use client'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { BackButton } from './back-button'

interface PageWrapperProps {
  heading: string | ReactNode
  path?: string
  children: React.ReactNode
  showHeading?: boolean
  showLink?: boolean
  backText?: string
  classname?: string
}

const PageWrapper = ({
  heading,
  children,
  path,
  showHeading = false,
  showLink = false,
  backText,
  classname,
}: PageWrapperProps) => {
  const slot =
    typeof heading == 'string' ? (
      <h1 className="font-serif text-left py-10 lg:text-5xl font-medium w-full capitalize leading-[100%] tracking-[-0.96px] text-[48px]">
        {heading}
      </h1>
    ) : (
      heading
    )
  return (
    <div
      className={cn('relative max-w-[680px] px-6 2xl:px-0 mx-auto', classname)}
    >
      <div className="flex flex-col gap-5">
        {showLink ? (
          <BackButton path={path ? path : ''} text={`${backText}`} />
        ) : null}
        {showHeading ? slot : null}
      </div>
      {children}
    </div>
  )
}

export { PageWrapper }
