import Link from 'next/link'
import '../styles/globals.css'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center mt-[20%]">
      <h1 className="text-9xl font-serif leading-[1.6] font-bold">404</h1>
      <p className="text-xl -mt-8">Page not found!</p>
      <Link href="/" className="underline text-[var(--primary)]">
        Go Home
      </Link>
    </div>
  )
}
