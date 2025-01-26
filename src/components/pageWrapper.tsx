import { ReactNode } from 'react'
import { BackButton } from './backButton'

interface PageWrapperProps {
  heading: string | ReactNode
  path: string
  children: React.ReactNode
  showHeading?: boolean
  showLink?: boolean
}

const PageWrapper = ({
  heading,
  children,
  path,
  showHeading = false,
  showLink = false,
}: PageWrapperProps) => {
  const slot =
    typeof heading == 'string' ? <h1 className="">{heading}</h1> : heading
  return (
    <div className="relative px-6 max-w-xl mx-auto">
      <div className="flex flex-col gap-8 mb-8">
        {showLink ? <BackButton path={path} text="Go home" /> : null}
        {showHeading ? slot : null}
      </div>
      {children}
    </div>
  )
}

export { PageWrapper }
