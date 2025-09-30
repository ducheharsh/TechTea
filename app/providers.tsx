'use client'

import { ReactNode } from 'react'
import { AuthProvider } from '@/lib/contexts/AuthContext'
import { SocketProvider } from '@/lib/contexts/SocketContext'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <SocketProvider>
        {children}
      </SocketProvider>
    </AuthProvider>
  )
}