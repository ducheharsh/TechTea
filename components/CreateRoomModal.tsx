'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { X, Lock, Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

interface CreateRoomModalProps {
  onClose: () => void
}

export default function CreateRoomModal({ onClose }: CreateRoomModalProps) {
  const router = useRouter()
  const { addRoom, username } = useStore()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState<'public' | 'private'>('public')
  const [password, setPassword] = useState('')

  const handleCreate = () => {
    if (!name.trim() || !description.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    if (type === 'private' && !password.trim()) {
      toast.error('Private rooms require a password')
      return
    }

    const newRoom = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
      type,
      creator: username,
      members: [username],
      updates: [],
      createdAt: new Date(),
      password: type === 'private' ? password : undefined,
    }

    addRoom(newRoom)
    toast.success('Room created successfully!')
    router.push(`/room/${newRoom.id}`)
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
          <h2 className="text-2xl font-bold">Create Room</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-text">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Room Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Web Dev Warriors"
              className="input w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's this room about?"
              rows={3}
              className="input w-full resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Room Type</label>
            <div className="flex gap-3">
              <button
                onClick={() => setType('public')}
                className={`flex-1 p-3 rounded-md border ${
                  type === 'public'
                    ? 'border-accent bg-accent bg-opacity-10'
                    : 'border-border'
                } transition-all`}
              >
                <Globe className="w-5 h-5 mx-auto mb-1" />
                <div className="text-sm font-medium">Public</div>
              </button>
              <button
                onClick={() => setType('private')}
                className={`flex-1 p-3 rounded-md border ${
                  type === 'private'
                    ? 'border-accent bg-accent bg-opacity-10'
                    : 'border-border'
                } transition-all`}
              >
                <Lock className="w-5 h-5 mx-auto mb-1" />
                <div className="text-sm font-medium">Private</div>
              </button>
            </div>
          </div>

          {type === 'private' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter room password"
                className="input w-full"
              />
            </motion.div>
          )}

          <div className="flex gap-3 pt-4">
            <button onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button onClick={handleCreate} className="btn-primary flex-1">
              Create Room
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}