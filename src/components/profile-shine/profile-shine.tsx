import Image from 'next/image'
export const ProfileShine = () => {
  return (
    <div className="mx-auto shimmer-parent flex justify-start items-stretch rounded-full overflow-hidden bg-clip-padding bg-[rgba(0,0,0,0.41)] w-7 h-7 relative group">
      <Image
        src={'/profile.jpeg'}
        alt="a profile of kehinde"
        width={32}
        height={32}
        loading="lazy"
        className=" w-full h-full mx-auto"
      />
      <span className="shimmer"></span>
    </div>
  )
}
