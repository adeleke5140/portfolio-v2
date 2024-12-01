import { CardAnimation } from '@/components/card-animation/card-animation'
import {
  CopyButton,
  IntegrationMenu,
} from '@/components/integration-menu/integration-menu'
import { ReactNode } from 'react'

export const CraftText = ({ text }: { text: string }) => {
  return (
    <p className="text-sm bg-gray-100/70 w-fit dark:bg-[#282828] dark:text-[#e5e5e5]  rounded-md px-3 ">
      {text}
    </p>
  )
}

export const CraftContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-gray-100/30 dark:bg-[#1c1c1c] dark:border-[#282828] border-[0.5px] rounded col-start-1 col-end-4 w-full py-10 p-2">
      {children}
    </div>
  )
}

export default function Index() {
  return (
    <div className="flex flex-col gap-5">
      <p className="">Craft</p>
      <section className="flex flex-col gap-4">
        <div className="grid gap-2  rid-cols-[192px_640px]">
          <CraftText text="Animated Card" />
          <CraftContainer>
            <CardAnimation />
          </CraftContainer>
        </div>
        <div className="grid gap-2 grid-cols-[192px_640px]">
          <CraftText text="Integration Menu" />
          <CraftContainer>
            <IntegrationMenu />
          </CraftContainer>
        </div>
      </section>
    </div>
  )
}
