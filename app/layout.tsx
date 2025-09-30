import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import OfflineIndicator from '@/components/OfflineIndicator'

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TechTea - Tech Learning Community',
  description: 'Share daily tech updates, learnings, and progress with friends',
  manifest: '/manifest.json',
  themeColor: '#0D1117',
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
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className={`${jetbrainsMono.className} bg-primary text-text antialiased`}>
        <OfflineIndicator />
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#21262D',
              color: '#F0F6FC',
              border: '1px solid #30363D',
            },
            success: {
              iconTheme: {
                primary: '#238636',
                secondary: '#F0F6FC',
              },
            },
            error: {
              iconTheme: {
                primary: '#F85149',
                secondary: '#F0F6FC',
              },
            },
          }}
        />
      </body>
    </html>
  )
}