'use client'

import { useEffect, useState } from 'react'
import { WifiOff, Wifi } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)
  const [showIndicator, setShowIndicator] = useState(false)

  useEffect(() => {
    setIsOnline(navigator.onLine)

    const handleOnline = () => {
      setIsOnline(true)
      setShowIndicator(true)
      setTimeout(() => setShowIndicator(false), 3000)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowIndicator(true)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <AnimatePresence>
      {showIndicator && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-lg border ${
            isOnline
              ? 'bg-success bg-opacity-20 border-success'
              : 'bg-warning bg-opacity-20 border-warning'
          }`}
        >
          <div className="flex items-center gap-2 text-sm font-medium">
            {isOnline ? (
              <>
                <Wifi className="w-4 h-4" />
                <span>Back Online</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4" />
                <span>You're Offline</span>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}