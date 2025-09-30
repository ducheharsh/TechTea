'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useStore } from '@/lib/store'
import {
  ArrowLeft,
  Send,
  Users,
  Trophy,
  Share2,
  Github,
  Clock,
  Code2,
  Smile,
  BarChart3,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import UpdateCard from '@/components/UpdateCard'
import LeaderboardPanel from '@/components/LeaderboardPanel'
import ShareModal from '@/components/ShareModal'
import IntegrationsPanel from '@/components/IntegrationsPanel'
import toast from 'react-hot-toast'
import { hashUpdate } from '@/lib/blockchain'

export default function RoomPage() {
  const router = useRouter()
  const params = useParams()
  const { rooms, username, addUpdate } = useStore()
  const [content, setContent] = useState('')
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [showShare, setShowShare] = useState<string | null>(null)
  const [showIntegrations, setShowIntegrations] = useState(false)

  const roomId = params.id as string
  const room = rooms.find((r) => r.id === roomId)

  useEffect(() => {
    const storedUsername = localStorage.getItem('username')
    if (!storedUsername) {
      router.push('/')
    } else if (!room) {
      router.push('/rooms')
    } else if (!room.members.includes(storedUsername)) {
      toast.error('You are not a member of this room')
      router.push('/rooms')
    }
  }, [room, router])

  const handlePostUpdate = async () => {
    if (!content.trim() || !room) return

    const update = {
      id: Date.now().toString(),
      userId: Date.now().toString(),
      username,
      content: content.trim(),
      timestamp: new Date(),
      blockchainHash: await hashUpdate(content.trim(), username),
      reactions: {},
    }

    addUpdate(roomId, update)
    setContent('')
    toast.success('Update posted and secured on blockchain!')
  }

  if (!room) return null

  const sortedUpdates = [...room.updates].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-secondary border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/rooms')}
                className="text-gray-400 hover:text-text transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold">{room.name}</h1>
                <p className="text-sm text-gray-400">{room.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowIntegrations(true)}
                className="btn-secondary flex items-center gap-2"
              >
                <Code2 className="w-4 h-4" />
                <span className="hidden sm:inline">Integrations</span>
              </button>
              <button
                onClick={() => setShowLeaderboard(!showLeaderboard)}
                className="btn-secondary flex items-center gap-2"
              >
                <Trophy className="w-4 h-4" />
                <span className="hidden sm:inline">Leaderboard</span>
              </button>
              <div className="flex items-center gap-2 px-3 py-2 bg-primary rounded-md border border-border">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">{room.members.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-4">
            {/* Post Update */}
            <div className="card terminal-border">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Send className="w-4 h-4" />
                Share Your Progress
              </h3>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What did you learn today? (Supports Markdown)"
                className="input w-full resize-none"
                rows={4}
              />
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>Secured by blockchain</span>
                </div>
                <button
                  onClick={handlePostUpdate}
                  disabled={!content.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post Update
                </button>
              </div>
            </div>

            {/* Updates Feed */}
            <AnimatePresence>
              {sortedUpdates.length > 0 ? (
                sortedUpdates.map((update) => (
                  <UpdateCard
                    key={update.id}
                    update={update}
                    roomId={roomId}
                    onShare={() => setShowShare(update.id)}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="card text-center py-12 text-gray-400"
                >
                  <p>No updates yet. Be the first to share your progress!</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {showLeaderboard ? (
              <LeaderboardPanel roomId={roomId} />
            ) : (
              <div className="card">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Room Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Total Updates</span>
                    <span className="font-bold text-accent">{room.updates.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Active Members</span>
                    <span className="font-bold text-success">{room.members.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Today's Posts</span>
                    <span className="font-bold text-warning">
                      {
                        room.updates.filter(
                          (u) =>
                            new Date(u.timestamp).toDateString() ===
                            new Date().toDateString()
                        ).length
                      }
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Members */}
            <div className="card">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Members
              </h3>
              <div className="space-y-2">
                {room.members.map((member) => (
                  <div
                    key={member}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-hover transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-bold">
                      {member[0].toUpperCase()}
                    </div>
                    <span className="text-sm">{member}</span>
                    {member === room.creator && (
                      <span className="ml-auto text-xs text-accent">Creator</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showShare && (
        <ShareModal
          update={room.updates.find((u) => u.id === showShare)!}
          onClose={() => setShowShare(null)}
        />
      )}

      {showIntegrations && (
        <IntegrationsPanel onClose={() => setShowIntegrations(false)} />
      )}
    </div>
  )
}