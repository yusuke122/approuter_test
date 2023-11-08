import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import styles from '../components/styles/myCustom.module.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '清水達也選手後援会',
  description: '清水達也選手後援会HP',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
