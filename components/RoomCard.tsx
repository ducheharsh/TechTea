'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Users, Lock } from 'lucide-react'
import { Room } from '@/lib/types'

interface RoomCardProps {
  room: Room
}

export function RoomCard({ room }: RoomCardProps) {
  return (
    <Link href={`/rooms/${room.id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="card cursor-pointer"
      >
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg">{room.name}</h3>
          {room.isPrivate && <Lock className="w-4 h-4 text-text/40" />}
        </div>
        <p className="text-text/60 text-sm mb-3 line-clamp-2">
          {room.description}
        </p>
        <div className="flex items-center gap-2 text-sm text-text/60">
          <Users className="w-4 h-4" />
          <span>{room.members.length} members</span>
        </div>
      </motion.div>
    </Link>
  )
}