import { Metadata } from 'next'
import { Introduction } from '@/components/introduction'
export const metadata: Metadata = {
  title: 'Kehinde Adeleke',
  description: 'Kehinde Adeleke portfolio',
  icons: {
    icon: '/kehinde.ico',
  },
}
export default function Home() {
  return <Introduction />
}
