'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { X, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

interface JoinRoomModalProps {
  roomId: string
  onClose: () => void
}

export default function JoinRoomModal({ roomId, onClose }: JoinRoomModalProps) {
  const router = useRouter()
  const { rooms, joinRoom, username } = useStore()
  const [password, setPassword] = useState('')
  
  const room = rooms.find((r) => r.id === roomId)

  if (!room) {
    onClose()
    return null
  }

  const handleJoin = () => {
    if (room.type === 'private' && password !== room.password) {
      toast.error('Incorrect password')
      return
    }

    joinRoom(roomId, username)
    toast.success('Joined room successfully!')
    router.push(`/room/${roomId}`)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="card max-w-md w-full terminal-border"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-warning" />
            <h2 className="text-2xl font-bold">Join Private Room</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-text">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-1">{room.name}</h3>
          <p className="text-sm text-gray-400">{room.description}</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleJoin()}
              placeholder="Enter room password"
              className="input w-full"
              autoFocus
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button onClick={handleJoin} className="btn-primary flex-1">
              Join Room
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}