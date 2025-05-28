import { cn } from '@/lib/utils'
import Image from 'next/image'
export const ProfileShine = ({ classname }: { classname: string }) => {
  return (
    <div
      className={cn(
        'mx-auto shimmer-parent flex justify-start items-stretch rounded-full overflow-hidden bg-clip-padding bg-[rgba(0,0,0,0.41)] w-7 h-7 relative group',
        classname
      )}
    >
      <Image
        src={'/kehinde.webp'}
        alt="a profile of kehinde"
        width={1080}
        height={1045}
        loading="lazy"
        className=" w-full h-full mx-auto"
      />
      <span className="shimmer"></span>
    </div>
  )
}
