import { PageWrapper } from '@/components/pageWrapper'
import Link from 'next/link'

export const metadata = {
  title: 'Craft',
  description: 'Craft components',
}

const items = [
  {
    category: 'motion',
    title: 'Multi-line Exclusion tabs',
    link: 'tabs',
    description: 'Smooth tabs with Clip-path but supports wrapped children',
  },
  {
    category: 'motion',
    title: 'Checkout card',
    link: 'card',
    description: "Card animation inspired by Ramp's card",
  },
  {
    category: 'motion',
    title: 'Integration Menu',
    link: 'integration-menu',
    description: 'Integration menu with notification',
  },
]
export default function Index() {
  return (
    <PageWrapper heading="Craft" path="/" backText="home" showLink showHeading>
      <p className="mb-3 text-sm capitalize text-ken-grey ">motion</p>
      <div className="flex flex-col gap-6">
        {items.map((component) => {
          return (
            <div
              key={component.link}
              className="max-w-[192px] flex flex-col gap-2"
            >
              <Link
                href={`/craft/${component.link}`}
                className="max-w-full text-[#e87400] font-medium underline underline-offset-2 decoration-[#e87400]"
              >
                {component.title}
              </Link>
              <p className="text-sm text-ken-grey">{component.description}</p>
            </div>
          )
        })}
      </div>
    </PageWrapper>
  )
}
