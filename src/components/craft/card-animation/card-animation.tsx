import { useState } from 'react'
import { CardAmount } from './card-amount'
import { CardHeader } from './card-header'
import { CardSpendDuration, durations } from './card-spend-duration'
import { CardSpendLimit } from './card-spend-limit'
import { CardStatus } from './card-status'

export const CardAnimation = () => {
  const [currentDuration, setCurrentDuration] =
    useState<(typeof durations)[number]>('weekly')
  return (
    <section className="bg-white dark:border-[#282828] dark:border dark:bg-[#232323] lg:w-96 mx-auto  flex flex-col gap-3 rounded-xl p-3 ">
      <CardHeader />
      <div className="border shadow-sm flex flex-col gap-10 p-4 border-[#e6e6e6] dark:border-[#343434] rounded-xl ">
        <CardStatus />
        <CardAmount />
      </div>
      <section>
        <CardSpendDuration
          setCurrentDuration={setCurrentDuration}
          currentDuration={currentDuration}
        />
        <CardSpendLimit duration={currentDuration} />
      </section>
    </section>
  )
}
