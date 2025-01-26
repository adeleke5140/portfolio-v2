import { CornerUpLeft, Undo2 } from 'lucide-react'
import Link from 'next/link'

interface BackButtonProps {
  path: string
  text: string
}

const BackButton = ({ path, text }: BackButtonProps) => {
  return (
    <div className="md:absolute -left-40 top-2">
      <Link
        href={path}
        className="flex gap-2 font-serif items-center tracking-tighter font-extralight italic w-fit text-sm "
      >
        <Undo2 size={12} />
        {text}
      </Link>
    </div>
  )
}

export { BackButton }
