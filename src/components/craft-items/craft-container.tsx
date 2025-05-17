import { ReactNode } from 'react'

export const CraftContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-gray-100/50 dark:bg-[#1c1c1c] dark:border-[#282828] border-[0.5px] rounded col-start-1 col-end-4 w-full py-10 p-2">
      {children}
    </div>
  )
}
