import { CardAnimation } from '@/components/card-animation/card-animation'
import {
  CopyButton,
  IntegrationMenu,
} from '@/components/integration-menu/integration-menu'
import { Navigation } from '@/components/navigation/navigation'
import { PageWrapper } from '@/components/pageWrapper'
import { ReactNode } from 'react'

export const CraftText = ({ text }: { text: string }) => {
  return (
    <p className="text-sm w-fit dark:bg-[#282828] dark:text-[#e5e5e5]  rounded-md px-0 py-2 ">
      {text}
    </p>
  )
}

export const CraftContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-gray-100/50 dark:bg-[#1c1c1c] dark:border-[#282828] border-[0.5px] rounded col-start-1 col-end-4 w-full py-10 p-2">
      {children}
    </div>
  )
}

export default function Index() {
  return (
    <PageWrapper heading="Craft" path="/" showHeading>
      <section className="flex flex-col gap-4">
        <div>
          <CraftText text="Animated Card" />
          <CraftContainer>
            <CardAnimation />
          </CraftContainer>
        </div>
        <div>
          <CraftText text="Integration Menu" />
          <CraftContainer>
            <IntegrationMenu />
          </CraftContainer>
        </div>

        <div>
          <CraftText text="Position aware indicator" />
          <CraftContainer>
            <Navigation />
          </CraftContainer>
        </div>
      </section>
    </PageWrapper>
  )
}
