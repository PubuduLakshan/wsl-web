import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wild Sri Lanka - Wildlife Photography & Conservation',
  description: 'Discover the natural beauty and wildlife of Sri Lanka through stunning photography and conservation efforts.',
  keywords: 'wildlife photography, Sri Lanka, conservation, nature, wildlife, photography competition',
  openGraph: {
    title: 'Wild Sri Lanka - Wildlife Photography & Conservation',
    description: 'Discover the natural beauty and wildlife of Sri Lanka through stunning photography and conservation efforts.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}