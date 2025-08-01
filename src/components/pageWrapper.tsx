'use client'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { BackButton } from './backButton'

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
      <h1 className="font-serif py-10 lg:text-7xl font-medium w-full border-b-[0.5px]  border-b-[#dcdcdc] mb-10 capitalize leading-[100%] tracking-[-0.96px] text-[48px]">
        {heading}
      </h1>
    ) : (
      heading
    )
  return (
    <div className={cn('relative px-6 md:px-0 mx-auto', classname)}>
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
