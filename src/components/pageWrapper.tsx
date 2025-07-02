'use client'
import { ReactNode } from 'react'
import { BackButton } from './backButton'

interface PageWrapperProps {
  heading: string | ReactNode
  path?: string
  children: React.ReactNode
  showHeading?: boolean
  showLink?: boolean
  backText?: string
}

const PageWrapper = ({
  heading,
  children,
  path,
  showHeading = false,
  showLink = false,
  backText,
}: PageWrapperProps) => {
  const slot =
    typeof heading == 'string' ? (
      <h1 className="font-clash mb-10 capitalize font-semibold leading-[100%] tracking-[-0.96px] text-[48px]">
        {heading}
      </h1>
    ) : (
      heading
    )
  return (
    <div className="relative px-6 max-w-[680px] mx-auto">
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
