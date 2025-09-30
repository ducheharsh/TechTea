import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { Providers } from './providers'

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'TechTea - Tech Learning Community',
  description: 'Share daily tech learnings and progress with friends',
  manifest: '/manifest.json',
  themeColor: '#58A6FF',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'TechTea',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className={`${jetbrainsMono.variable} font-mono bg-primary text-text antialiased`}>
        <Providers>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#21262D',
                color: '#F0F6FC',
                border: '1px solid #30363D',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}