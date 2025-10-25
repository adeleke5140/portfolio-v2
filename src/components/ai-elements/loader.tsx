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
      className="size-5 text-white"
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
