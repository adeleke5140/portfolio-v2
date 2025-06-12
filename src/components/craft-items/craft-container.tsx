import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export const CraftContainer = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        'bg-gray-100/50 grid place-items-center dark:bg-[#1c1c1c] min-h-[264px] dark:border-[#282828] border-[0.5px] rounded-xl w-full py-10 p-2',
        className
      )}
    >
      {children}
    </div>
  )
}
