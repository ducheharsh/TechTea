'use client'

import { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

interface StatsCardProps {
  icon: LucideIcon
  label: string
  value: string
  color?: 'accent' | 'success' | 'warning'
}

export function StatsCard({ icon: Icon, label, value, color = 'accent' }: StatsCardProps) {
  const colorClasses = {
    accent: 'text-accent',
    success: 'text-success',
    warning: 'text-warning',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card hover:terminal-glow"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-text/60 text-sm mb-1">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <Icon className={cn('w-8 h-8', colorClasses[color])} />
      </div>
    </motion.div>
  )
}