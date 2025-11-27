import { ArrowUpIcon } from 'lucide-react'
import Link from 'next/link'

interface BackButtonProps {
  path: string
  text: string
}

const BackButton = ({ path, text }: BackButtonProps) => {
  return (
    <div>
      <Link
        href={path}
        className="flex font-serif gap-1.5 underline items-center text-ken-grey tracking-tighter font-extralight w-fit text-sm "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="size-4 -rotate-180"
          fill="currentColor"
        >
          <path d="m22,9v-2h-1v-2h-1v-1h-1v-1h-2v-1h-2v-1h-6v1h-2v1h-2v1h-1v1h-1v2h-1v2h-1v6h1v2h1v2h1v1h1v1h2v1h2v1h6v-1h2v-1h2v-1h1v-1h1v-2h1v-2h1v-6h-1Zm-1,6h-1v2h-1v2h-2v1h-2v1h-6v-1h-2v-1h-2v-2h-1v-2h-1v-6h1v-2h1v-2h2v-1h2v-1h6v1h2v1h2v2h1v2h1v6Z" />
          <polygon points="17 11 17 13 16 13 16 14 15 14 15 15 14 15 14 16 13 16 13 17 12 17 12 13 6 13 6 11 12 11 12 7 13 7 13 8 14 8 14 9 15 9 15 10 16 10 16 11 17 11" />
        </svg>
        <span className="capitalize">{text}</span>
      </Link>
    </div>
  )
}

export { BackButton }
