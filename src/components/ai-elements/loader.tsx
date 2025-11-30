import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

type LoaderIconProps = {
  size?: number
}

const LoaderIcon = ({ size = 16 }: LoaderIconProps) => (
  <svg
    height={size}
    strokeLinejoin="round"
    style={{ color: 'currentcolor' }}
    viewBox="0 0 16 16"
    width={size}
  >
    <title>Loader</title>
    <g clipPath="url(#clip0_2393_1490)">
      <path d="M8 0V4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 16V12"
        opacity="0.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3.29773 1.52783L5.64887 4.7639"
        opacity="0.9"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12.7023 1.52783L10.3511 4.7639"
        opacity="0.1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12.7023 14.472L10.3511 11.236"
        opacity="0.4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3.29773 14.472L5.64887 11.236"
        opacity="0.6"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M15.6085 5.52783L11.8043 6.7639"
        opacity="0.2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M0.391602 10.472L4.19583 9.23598"
        opacity="0.7"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M15.6085 10.4722L11.8043 9.2361"
        opacity="0.3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M0.391602 5.52783L4.19583 6.7639"
        opacity="0.8"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </g>
    <defs>
      <clipPath id="clip0_2393_1490">
        <rect fill="white" height="16" width="16" />
      </clipPath>
    </defs>
  </svg>
)

export const SidebarIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      aria-hidden="true"
      role="graphics-symbol"
      viewBox="0 0 20 20"
      className={cn('size-4', className)}
    >
      <path d="M10.392 6.125a.5.5 0 0 0-.5.5v6.75a.5.5 0 0 0 .5.5h4.683a.5.5 0 0 0 .5-.5v-6.75a.5.5 0 0 0-.5-.5z"></path>
      <path d="M4.5 4.125A2.125 2.125 0 0 0 2.375 6.25v7.5c0 1.174.951 2.125 2.125 2.125h11a2.125 2.125 0 0 0 2.125-2.125v-7.5A2.125 2.125 0 0 0 15.5 4.125zM3.625 6.25c0-.483.392-.875.875-.875h11c.483 0 .875.392.875.875v7.5a.875.875 0 0 1-.875.875h-11a.875.875 0 0 1-.875-.875z"></path>
    </svg>
  )
}

export const MinimizeIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      aria-hidden="true"
      role="graphics-symbol"
      viewBox="0 0 20 20"
      className={cn('size-4', className)}
    >
      <path d="M4 9.375a.625.625 0 1 0 0 1.25h12a.625.625 0 1 0 0-1.25z"></path>
    </svg>
  )
}

export const NewChatIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      aria-hidden="true"
      role="graphics-symbol"
      viewBox="0 0 20 20"
      className={cn('size-4', className)}
    >
      <path d="m16.774 4.341-.59.589-1.109-1.11.596-.594a.784.784 0 0 1 1.103 0c.302.302.302.8 0 1.102zM8.65 12.462l6.816-6.813-1.11-1.11-6.822 6.808a1.1 1.1 0 0 0-.236.393l-.289.932c-.052.196.131.38.315.314l.932-.288a.9.9 0 0 0 .394-.236"></path>
      <path d="M4.375 6.25c0-1.036.84-1.875 1.875-1.875H11a.625.625 0 1 0 0-1.25H6.25A3.125 3.125 0 0 0 3.125 6.25v7.5c0 1.726 1.4 3.125 3.125 3.125h7.5c1.726 0 3.125-1.4 3.125-3.125V9a.625.625 0 1 0-1.25 0v4.75c0 1.036-.84 1.875-1.875 1.875h-7.5a1.875 1.875 0 0 1-1.875-1.875z"></path>
    </svg>
  )
}

export const FloatingIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      aria-hidden="true"
      role="graphics-symbol"
      viewBox="0 0 20 20"
      className={cn('size-4', className)}
    >
      <path d="M11.93 9.125a.5.5 0 0 0-.5.5v3.75a.5.5 0 0 0 .5.5h3.145a.5.5 0 0 0 .5-.5v-3.75a.5.5 0 0 0-.5-.5z"></path>
      <path d="M4.5 4.125A2.125 2.125 0 0 0 2.375 6.25v7.5c0 1.174.951 2.125 2.125 2.125h11a2.125 2.125 0 0 0 2.125-2.125v-7.5A2.125 2.125 0 0 0 15.5 4.125zM3.625 6.25c0-.483.392-.875.875-.875h11c.483 0 .875.392.875.875v7.5a.875.875 0 0 1-.875.875h-11a.875.875 0 0 1-.875-.875z"></path>
    </svg>
  )
}

export type LoaderProps = HTMLAttributes<HTMLDivElement> & {
  size?: number
}

export const Loader = ({ className, size = 16, ...props }: LoaderProps) => (
  <div
    className={cn(
      'inline-flex animate-spin items-center justify-center',
      className
    )}
    {...props}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="spinner-solid"
      viewBox="0 0 24 24"
      className="size-5"
    >
      <polygon
        fill="currentColor"
        points="7 5 8 5 8 7 7 7 7 8 5 8 5 7 4 7 4 5 5 5 5 4 7 4 7 5"
      />
      <polygon
        fill="currentColor"
        points="13 2 14 2 14 4 13 4 13 5 11 5 11 4 10 4 10 2 11 2 11 1 13 1 13 2"
      />
      <polygon
        fill="currentColor"
        points="4 14 2 14 2 13 1 13 1 11 2 11 2 10 4 10 4 11 5 11 5 13 4 13 4 14"
      />
      <polygon
        fill="currentColor"
        points="7 17 8 17 8 19 7 19 7 20 5 20 5 19 4 19 4 17 5 17 5 16 7 16 7 17"
      />
      <polygon
        fill="currentColor"
        points="23 11 23 13 22 13 22 14 20 14 20 13 19 13 19 11 20 11 20 10 22 10 22 11 23 11"
      />
      <polygon
        fill="currentColor"
        points="19 17 20 17 20 19 19 19 19 20 17 20 17 19 16 19 16 17 17 17 17 16 19 16 19 17"
      />
      <polygon
        fill="currentColor"
        points="13 20 14 20 14 22 13 22 13 23 11 23 11 22 10 22 10 20 11 20 11 19 13 19 13 20"
      />
    </svg>
  </div>
)

export const MaximizeIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn('size-4', className)}
    >
      <polygon points="14 11 15 11 15 13 14 13 14 14 13 14 13 15 11 15 11 14 10 14 10 13 9 13 9 11 10 11 10 10 11 10 11 9 13 9 13 10 14 10 14 11" />
      <polygon points="6 11 7 11 7 13 6 13 6 14 5 14 5 15 3 15 3 14 2 14 2 13 1 13 1 11 2 11 2 10 3 10 3 9 5 9 5 10 6 10 6 11" />
      <polygon points="23 11 23 13 22 13 22 14 21 14 21 15 19 15 19 14 18 14 18 13 17 13 17 11 18 11 18 10 19 10 19 9 21 9 21 10 22 10 22 11 23 11" />
    </svg>
  )
}
