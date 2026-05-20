import { cn } from '@/lib/utils'
import Link from 'next/link'

const links = [
  { name: 'Home', href: '/' },
  { name: 'Craft', href: '/craft' },
  { name: 'Blog', href: '/blog' },
]

export const Nav = () => {

  return (
    <nav className="mx-auto">
      <ul className="flex items-center px-1 gap-1  py-1">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className={cn(
                'text-sm md:px-0 relative dark:text-[#e5e5e5] grid place-items-center px-3 py-1 font-sm'
              )}
            >
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
