'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Search, Users } from 'lucide-react'
import { useAuth } from '@/lib/contexts/AuthContext'
import { useRoomStore } from '@/lib/stores/roomStore'
import toast from 'react-hot-toast'

interface JoinRoomModalProps {
  onClose: () => void
}

export function JoinRoomModal({ onClose }: JoinRoomModalProps) {
  const { user } = useAuth()
  const { rooms, setRooms } = useRoomStore()
  const [inviteCode, setInviteCode] = useState('')

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    // Find room by invite code
    const room = rooms.find((r) => r.inviteCode === inviteCode)

    if (!room) {
      toast.error('Invalid invite code')
      return
    }

    if (room.members.some((m) => m.userId === user.id)) {
      toast.error('You are already a member of this room')
      return
    }

    // Add user to room
    const updatedRooms = rooms.map((r) => {
      if (r.id === room.id) {
        return {
          ...r,
          members: [
            ...r.members,
            {
              userId: user.id,
              username: user.username,
              avatar: user.avatar,
              role: 'member' as const,
              joinedAt: new Date(),
            },
          ],
        }
      }
      return r
    })

    setRooms(updatedRooms)
    toast.success(`Joined ${room.name}!`)
    onClose()
  }

  const publicRooms = rooms.filter((r) => !r.isPrivate && !r.members.some((m) => m.userId === user?.id))

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card max-w-lg w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Join Room</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-hover rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Join with invite code */}
        <form onSubmit={handleJoin} className="mb-6">
          <label className="block text-sm font-medium mb-2">Private Room Invite Code</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              className="input flex-1"
              placeholder="Enter invite code"
            />
            <button type="submit" className="btn-primary">
              Join
            </button>
          </div>
        </form>

        <div className="border-t border-border pt-6">
          <h3 className="text-lg font-semibold mb-4">Public Rooms</h3>
          
          {publicRooms.length === 0 ? (
            <p className="text-text/60 text-center py-4">No public rooms available</p>
          ) : (
            <div className="space-y-3">
              {publicRooms.map((room) => (
                <div key={room.id} className="p-4 border border-border rounded-lg hover:border-accent transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{room.name}</h4>
                      <p className="text-sm text-text/60 mb-2">{room.description}</p>
                      <div className="flex items-center gap-2 text-sm text-text/60">
                        <Users className="w-4 h-4" />
                        <span>{room.members.length} members</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (!user) return
                        const updatedRooms = rooms.map((r) => {
                          if (r.id === room.id) {
                            return {
                              ...r,
                              members: [
                                ...r.members,
                                {
                                  userId: user.id,
                                  username: user.username,
                                  avatar: user.avatar,
                                  role: 'member' as const,
                                  joinedAt: new Date(),
                                },
                              ],
                            }
                          }
                          return r
                        })
                        setRooms(updatedRooms)
                        toast.success(`Joined ${room.name}!`)
                        onClose()
                      }}
                      className="btn-primary"
                    >
                      Join
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}