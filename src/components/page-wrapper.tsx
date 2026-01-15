'use client'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

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
    heading && typeof heading == 'string' ? (
      <h1 className="text-left py-10 text-[40px] w-full capitalize leading-[100%] tracking-[-0.96px]">
        {heading}
      </h1>
    ) : (
      heading
    )
  return (
    <div className={cn('relative mt-4  2xl:px-0 mx-auto', classname)}>
      <div className="flex flex-col gap-5">{showHeading ? slot : null}</div>
      {children}
    </div>
  )
}

export { PageWrapper }
