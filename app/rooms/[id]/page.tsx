'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Users, Plus, Settings, Share2, Copy } from 'lucide-react'
import { useAuth } from '@/lib/contexts/AuthContext'
import { Navbar } from '@/components/Navbar'
import { UpdateCard } from '@/components/UpdateCard'
import { CreateUpdateModal } from '@/components/modals/CreateUpdateModal'
import { useRoomStore } from '@/lib/stores/roomStore'
import toast from 'react-hot-toast'

export default function RoomPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { user, loading } = useAuth()
  const { rooms, updates } = useRoomStore()
  const [showCreateUpdate, setShowCreateUpdate] = useState(false)
  const [showMembers, setShowMembers] = useState(false)

  const room = rooms.find((r) => r.id === params.id)
  const roomUpdates = updates.filter((u) => u.roomId === params.id)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-primary">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="card text-center py-12">
            <p className="text-text/60 mb-4">Room not found</p>
            <button onClick={() => router.push('/rooms')} className="btn-primary">
              Back to Rooms
            </button>
          </div>
        </div>
      </div>
    )
  }

  const isMember = room.members.some((m) => m.userId === user.id)
  const userRole = room.members.find((m) => m.userId === user.id)?.role

  const handleCopyInvite = () => {
    const inviteLink = room.inviteCode 
      ? `${window.location.origin}/rooms/join?code=${room.inviteCode}`
      : window.location.href
    
    navigator.clipboard.writeText(inviteLink)
    toast.success('Invite link copied!')
  }

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Room Header */}
        <div className="card mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{room.name}</h1>
              <p className="text-text/60">{room.description}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={handleCopyInvite} className="btn-secondary flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Invite
              </button>
              {(userRole === 'owner' || userRole === 'admin') && (
                <button className="btn-secondary flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Settings
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowMembers(!showMembers)}
              className="flex items-center gap-2 text-text/60 hover:text-accent transition-colors"
            >
              <Users className="w-5 h-5" />
              <span>{room.members.length} members</span>
            </button>
            
            {room.inviteCode && (
              <button
                onClick={() => {
                  navigator.clipboard.writeText(room.inviteCode!)
                  toast.success('Invite code copied!')
                }}
                className="flex items-center gap-2 text-text/60 hover:text-accent transition-colors"
              >
                <Copy className="w-5 h-5" />
                <span className="font-mono">{room.inviteCode}</span>
              </button>
            )}
          </div>

          {showMembers && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-4 pt-4 border-t border-border"
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {room.members.map((member) => (
                  <div key={member.userId} className="flex items-center gap-3 p-3 bg-hover rounded-lg">
                    <img
                      src={member.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.username}`}
                      alt={member.username}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{member.username}</div>
                      <div className="text-sm text-text/60 capitalize">{member.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Updates Section */}
        {isMember ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Updates</h2>
              <button
                onClick={() => setShowCreateUpdate(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Share Update
              </button>
            </div>

            {roomUpdates.length === 0 ? (
              <div className="card text-center py-12">
                <p className="text-text/60 mb-4">No updates yet. Be the first to share!</p>
                <button onClick={() => setShowCreateUpdate(true)} className="btn-primary">
                  Share Update
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {roomUpdates.map((update) => (
                  <UpdateCard key={update.id} update={update} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="card text-center py-12">
            <p className="text-text/60 mb-4">You need to be a member to view updates</p>
            <button className="btn-primary">Join Room</button>
          </div>
        )}
      </div>

      {showCreateUpdate && <CreateUpdateModal onClose={() => setShowCreateUpdate(false)} />}
    </div>
  )
}