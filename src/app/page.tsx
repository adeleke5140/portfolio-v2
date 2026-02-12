import { Metadata } from 'next'
import { Introduction } from '@/components/introduction'
export const metadata: Metadata = {
  title: 'Kehinde Adeleke',
  icons: {
    icon: '/kehinde.ico',
  },
}
export default function Home() {
  return <Introduction />
}
