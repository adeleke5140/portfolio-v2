'use client'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useState } from 'react'

export const BlogIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn('w-4 h-4 shrink-0', className)}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5 21C5 12.2792 8.29485 3.55839 18.0725 3.00155C18.627 2.96997 19.0862 3.42569 18.9862 3.96975C18.3434 7.46729 14.5532 9.98373 14.5532 9.98373L15.9986 11.0634C16.338 11.3169 16.479 11.7528 16.2992 12.1355C15.5251 13.7832 12.8684 17.9956 5.93856 17.9956"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  )
}

export const photos = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn('w-4 h-4 shrink-0', className)}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <polyline points="11 3 11 11 14 8 17 11 17 3" />
    </svg>
  )
}

export const HomeIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn('w-4 h-4 shrink-0', className)}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M20 6.5L17.4448 8.98386C16.6121 8.97828 15.7463 9.08581 14.8767 9.3188C14.0072 9.55178 13.2037 9.89153 12.4854 10.3127L8.23926 9.32674L9.11761 14.1907C8.79389 15.135 8.73348 16.1269 8.99221 17.0925C9.29987 18.2407 10.0169 19.1954 11 19.8962M5 20H19C19.5523 20 20 19.5523 20 19V5C20 4.44772 19.5523 4 19 4H5C4.44772 4 4 4.44772 4 5V19C4 19.5523 4.44772 20 5 20Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      ></path>
      <path
        d="M13.9884 14.4899C14.1717 15.1742 13.8581 15.8527 13.2879 16.0055C12.7177 16.1583 12.1068 15.7275 11.9234 15.0432C11.7401 14.359 12.0537 13.6804 12.6239 13.5276C13.1941 13.3748 13.805 13.8057 13.9884 14.4899Z"
        fill="currentColor"
      ></path>
      <path
        d="M20.1827 12.83C20.3661 13.5143 20.0524 14.1928 19.4822 14.3456C18.912 14.4984 18.3011 14.0676 18.1178 13.3833C17.9344 12.699 18.2481 12.0205 18.8183 11.8677C19.3885 11.7149 19.9994 12.1458 20.1827 12.83Z"
        fill="currentColor"
      ></path>
      <path
        d="M18.0671 16.4955C18.1893 16.9516 17.7337 17.4701 17.0494 17.6534C16.3652 17.8367 15.7114 17.6156 15.5892 17.1594C15.4669 16.7032 15.9225 16.1848 16.6068 16.0015C17.2911 15.8181 17.9448 16.0393 18.0671 16.4955Z"
        fill="currentColor"
      ></path>
    </svg>
  )
}

export const AboutIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn('w-4 h-4 shrink-0', className)}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M7.60432 8.13491L6.86929 4.13131L7.51863 3.59433C8.93283 2.42484 11.0996 3.0614 11.6333 4.80313M15.141 14.4185C16.1348 13.6216 17.5974 13.7463 18.4312 14.7051C19.2943 15.6975 19.1596 17.1954 18.1329 18.0228L16.3602 19.4514C13.4126 21.8267 9.07509 21.4254 6.62767 18.5508C4.15811 15.6503 4.54199 11.3259 7.4851 8.89209L13.7274 3.72992C14.7023 2.92376 16.1557 3.04908 16.9737 4.00982C17.7917 4.97057 17.6645 6.40293 16.6897 7.20909L12.9633 10.2906L13.5517 9.80407C14.5265 8.99791 15.9799 9.12323 16.7979 10.084C17.6159 11.0447 17.4887 12.4771 16.5139 13.2832L15.9255 13.7698"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  )
}

export const ToolsIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn('w-4 h-4 shrink-0', className)}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12.0002 4.99693V2.99609M16 5V3M8.00018 5V2.99609M12 21V19M16 21V19M8 21V19M19 16H21M19 8H21M19 12H21M3 12H5M3 16H5M3 8H5M15.0013 12.0003C15.0013 13.6578 13.6576 15.0015 12 15.0015C10.3425 15.0015 8.99878 13.6578 8.99878 12.0003C8.99878 10.3427 10.3425 8.99902 12 8.99902C13.6576 8.99902 15.0013 10.3427 15.0013 12.0003ZM6 19H18C18.5523 19 19 18.5523 19 18V6C19 5.44772 18.5523 5 18 5H6C5.44772 5 5 5.44772 5 6V18C5 18.5523 5.44772 19 6 19Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  )
}

type Link = (typeof links)[number]

function getBorderRadius(path: string, allLinks: Array<Link>) {
  if (path == allLinks[0].href) {
    return {
      borderRadius: '16px',
      borderTopRightRadius: '4px',
      borderBottomRightRadius: '4px',
    }
  } else if (path == allLinks[allLinks.length - 1].href) {
    return {
      borderRadius: '16px',
      borderTopLeftRadius: '4px',
      borderBottomLeftRadius: '4px',
    }
  }
  return {
    borderRadius: '4px',
  }
}

export const CraftIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3 h-3"
    >
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  )
}

const links = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Craft', href: '/craft', icon: CraftIcon },
  { name: 'Blog', href: '/blog', icon: BlogIcon },
]

export const Navigation = () => {
  const [activeLink, setactiveLink] = useState(links[0].href)

  return (
    <nav className="mx-auto w-fit border rounded-full bg-white border-gray-100/90 dark:border-[#282828]">
      <ul className="flex items-center px-1 gap-1  py-1">
        {links.map((link) => (
          <li key={link.name}>
            <button
              type="button"
              onClick={() => setactiveLink(link.href)}
              className={cn(
                'text-sm relative dark:text-[#e5e5e5] grid place-items-center px-3 py-1 font-sm'
              )}
            >
              <span className="inline-flex dark:text-[#e5e5e5] items-center gap-1">
                <link.icon />
                <span>{link.name}</span>
              </span>

              {activeLink === link.href ? (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 bg-gray-100 dark:bg-[#282828] dark:mix-blend-lighten mix-blend-darken"
                  style={{
                    ...getBorderRadius(link.href, links),
                  }}
                  transition={{
                    type: 'spring',
                    bounce: 0.2,
                    duration: 0.6,
                  }}
                />
              ) : null}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
