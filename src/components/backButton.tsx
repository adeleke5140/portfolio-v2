import { CornerUpLeft, Undo2 } from 'lucide-react'
import Link from 'next/link'
import { home } from './navigation/navigation'

interface BackButtonProps {
  path: string
  text: string
}

const BackButton = ({ path, text }: BackButtonProps) => {
  return (
    <div className="md:absolute -left-40 top-2">
      <Link
        href={path}
        className="flex gap-2 underline items-center tracking-tighter font-extralight w-fit text-sm "
      >
        {home}
        {text}
      </Link>
    </div>
  )
}

export { BackButton }
