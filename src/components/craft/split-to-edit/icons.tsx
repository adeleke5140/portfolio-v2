import { cn } from '@/lib/utils'

export const CheckMark = ({ className }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      fill="currentColor"
      className={cn(className)}
    >
      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
    </svg>
  )
}

export const Pen = ({ className }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      className={className}
    >
      <path
        d="M18.086,5.5,3.293,20.293a1.008,1.008,0,0,0-.27.49l-2,9A1,1,0,0,0,2,31a1.067,1.067,0,0,0,.217-.023l9-2a1.008,1.008,0,0,0,.49-.27L26.5,13.914Z"
        fill="#92909d"
      />
      <path
        d="M30.121,6.051,25.949,1.878a3.006,3.006,0,0,0-4.242,0L19.5,4.086,27.914,12.5l2.208-2.207A3.007,3.007,0,0,0,30.121,6.051Z"
        fill="#92909d"
      />
    </svg>
  )
}
