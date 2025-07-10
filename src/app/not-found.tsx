import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center mt-[20%]">
      <h1 className="text-7xl font-clash font-bold">404</h1>
      <p className="text-xl">Page not found!</p>
      <Link href="/" className="underline text-[var(--primary)]">
        Go Home
      </Link>
    </div>
  )
}
