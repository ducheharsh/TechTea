'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Github, Clock, Code2, Shield } from 'lucide-react'
import { useAuth } from '@/lib/contexts/AuthContext'
import { useRoomStore } from '@/lib/stores/roomStore'
import { Update } from '@/lib/types'
import { blockchainService } from '@/lib/utils/blockchain'
import { githubService } from '@/lib/services/github'
import { wakatimeService } from '@/lib/services/wakatime'
import toast from 'react-hot-toast'

interface CreateUpdateModalProps {
  onClose: () => void
}

export function CreateUpdateModal({ onClose }: CreateUpdateModalProps) {
  const { user } = useAuth()
  const { rooms, addUpdate } = useRoomStore()
  const [content, setContent] = useState('')
  const [selectedRoom, setSelectedRoom] = useState('')
  const [type, setType] = useState<Update['type']>('learning')
  const [tags, setTags] = useState('')
  const [links, setLinks] = useState('')
  const [includeGitHub, setIncludeGitHub] = useState(false)
  const [includeWakatime, setIncludeWakatime] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (rooms.length > 0 && !selectedRoom) {
      setSelectedRoom(rooms[0].id)
    }
  }, [rooms, selectedRoom])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user || !selectedRoom) return

    setLoading(true)

    try {
      // Fetch integrations data if requested
      let githubActivity
      let wakatimeStats

      if (includeGitHub && user.githubUsername) {
        githubActivity = await githubService.getUserActivity(user.githubUsername)
      }

      if (includeWakatime && user.wakatimeUsername) {
        wakatimeStats = await wakatimeService.getUserStats(user.wakatimeUsername, 'today')
      }

      // Store on blockchain
      const updateId = Date.now().toString()
      const txHash = await blockchainService.storeUpdate(updateId, content)

      const newUpdate: Update = {
        id: updateId,
        roomId: selectedRoom,
        userId: user.id,
        username: user.username,
        avatar: user.avatar,
        content,
        type,
        tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
        links: links.split('\n').filter(Boolean),
        githubActivity,
        wakatimeStats,
        blockchainTxHash: txHash || undefined,
        isBlockchainVerified: !!txHash,
        likes: [],
        comments: [],
        createdAt: new Date(),
      }

      addUpdate(newUpdate)
      toast.success('Update posted successfully!')
      onClose()
    } catch (error) {
      console.error('Error creating update:', error)
      toast.error('Failed to post update')
    } finally {
      setLoading(false)
    }
  }

  const types: Array<{ value: Update['type']; label: string }> = [
    { value: 'learning', label: '📚 Learning' },
    { value: 'achievement', label: '🏆 Achievement' },
    { value: 'progress', label: '📈 Progress' },
    { value: 'read', label: '📖 Read' },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card max-w-2xl w-full my-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Share Update</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-hover rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Room</label>
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="input"
              required
            >
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <div className="grid grid-cols-4 gap-2">
              {types.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setType(t.value)}
                  className={`p-2 rounded-lg border text-sm transition-all ${
                    type === t.value
                      ? 'border-accent bg-accent/10'
                      : 'border-border hover:border-accent/50'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">What did you learn/achieve today?</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="input min-h-[150px]"
              placeholder="Share your progress, learnings, or achievements..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="input"
              placeholder="react, typescript, nextjs"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Links (one per line)</label>
            <textarea
              value={links}
              onChange={(e) => setLinks(e.target.value)}
              className="input min-h-[80px]"
              placeholder="https://github.com/user/repo"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium mb-2">Include Integrations</label>
            
            {user?.githubUsername && (
              <label className="flex items-center gap-2 p-3 border border-border rounded-lg hover:bg-hover cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeGitHub}
                  onChange={(e) => setIncludeGitHub(e.target.checked)}
                  className="w-4 h-4"
                />
                <Github className="w-5 h-5" />
                <span>Include GitHub activity</span>
              </label>
            )}

            {user?.wakatimeUsername && (
              <label className="flex items-center gap-2 p-3 border border-border rounded-lg hover:bg-hover cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeWakatime}
                  onChange={(e) => setIncludeWakatime(e.target.checked)}
                  className="w-4 h-4"
                />
                <Clock className="w-5 h-5" />
                <span>Include Wakatime stats</span>
              </label>
            )}
          </div>

          <div className="flex items-center gap-2 p-3 bg-success/10 border border-success/30 rounded-lg">
            <Shield className="w-5 h-5 text-success" />
            <span className="text-sm">This update will be stored on blockchain for immutability</span>
          </div>

          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? 'Posting...' : 'Post Update'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}