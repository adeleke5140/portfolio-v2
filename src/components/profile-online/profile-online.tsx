

import Image from 'next/image'

export const ProfileOnline = () => {
 
  return (
    <div className='mx-auto w-8 relative'>
      <span
        className="min-w-[32px] w-8 h-8 will-change-transform "
        style={{
          clipPath: 'url(#mask)',
        }}
      >
        <Image
          src={'/profile.jpeg'}
          alt="a profile of kehinde"
          width={32}
          height={32}
          loading="lazy"
        />
        <svg
          className="absolute bottom-0 right-0"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <clipPath id="mask">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M29.3228 20.3946C30.2678 20.7269 31.4282 20.3718 31.6396 19.3927C31.8757 18.2992 32 17.1641 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C17.1641 32 18.2992 31.8757 19.3927 31.6396C20.3718 31.4282 20.7269 30.2678 20.3946 29.3228C20.139 28.596 20 27.8142 20 27C20 23.134 23.134 20 27 20C27.8142 20 28.596 20.139 29.3228 20.3946Z"
            />
          </clipPath>
        </svg>
      </span>
      <span className='bg-green-500 right-px bottom-px rounded-full absolute h-2 w-2'></span>
    </div>
  )
}
