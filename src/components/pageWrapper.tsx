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
      <h1 className="font-sans font-medium tracking-tighter text-xl">
        {heading}
      </h1>
    ) : (
      heading
    )
  return (
    <div className="relative min-h-screen px-6 max-w-xl mx-auto">
      <div className="flex flex-col gap-8 mb-8">
        {showLink ? (
          <BackButton path={path ? path : ''} text={`Go ${backText}`} />
        ) : null}
        {showHeading ? slot : null}
      </div>
      {children}
    </div>
  )
}

export { PageWrapper }
