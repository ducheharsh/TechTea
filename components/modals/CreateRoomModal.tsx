'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Lock, Globe } from 'lucide-react'
import { useAuth } from '@/lib/contexts/AuthContext'
import { useRoomStore } from '@/lib/stores/roomStore'
import { Room } from '@/lib/types'
import toast from 'react-hot-toast'

interface CreateRoomModalProps {
  onClose: () => void
}

export function CreateRoomModal({ onClose }: CreateRoomModalProps) {
  const { user } = useAuth()
  const { addRoom } = useRoomStore()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    const newRoom: Room = {
      id: Date.now().toString(),
      name,
      description,
      isPrivate,
      createdBy: user.id,
      members: [
        {
          userId: user.id,
          username: user.username,
          avatar: user.avatar,
          role: 'owner',
          joinedAt: new Date(),
        },
      ],
      inviteCode: isPrivate ? Math.random().toString(36).substring(7) : undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    addRoom(newRoom)
    toast.success('Room created successfully!')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card max-w-lg w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Create Room</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-hover rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Room Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="Web Dev Squad"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input min-h-[100px]"
              placeholder="What's this room about?"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Privacy</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setIsPrivate(false)}
                className={`p-4 rounded-lg border transition-all ${
                  !isPrivate
                    ? 'border-accent bg-accent/10'
                    : 'border-border hover:border-accent/50'
                }`}
              >
                <Globe className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium">Public</div>
                <div className="text-sm text-text/60">Anyone can join</div>
              </button>

              <button
                type="button"
                onClick={() => setIsPrivate(true)}
                className={`p-4 rounded-lg border transition-all ${
                  isPrivate
                    ? 'border-accent bg-accent/10'
                    : 'border-border hover:border-accent/50'
                }`}
              >
                <Lock className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium">Private</div>
                <div className="text-sm text-text/60">Invite only</div>
              </button>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" className="btn-primary flex-1">
              Create Room
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}