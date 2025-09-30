'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, MessageCircle, Share2, Shield, Clock } from 'lucide-react'
import { Update } from '@/lib/types'
import { formatDistanceToNow } from 'date-fns'
import { useAuth } from '@/lib/contexts/AuthContext'
import { useRoomStore } from '@/lib/stores/roomStore'
import { ShareTemplates } from './ShareTemplates'
import toast from 'react-hot-toast'

interface UpdateCardProps {
  update: Update
}

export function UpdateCard({ update }: UpdateCardProps) {
  const { user } = useAuth()
  const { updateUpdate } = useRoomStore()
  const [showComments, setShowComments] = useState(false)
  const [showShareTemplates, setShowShareTemplates] = useState(false)
  const [comment, setComment] = useState('')

  const isLiked = user ? update.likes.includes(user.id) : false

  const handleLike = () => {
    if (!user) return

    const newLikes = isLiked
      ? update.likes.filter((id) => id !== user.id)
      : [...update.likes, user.id]

    updateUpdate(update.id, { likes: newLikes })
  }

  const handleComment = () => {
    if (!user || !comment.trim()) return

    const newComment = {
      id: Date.now().toString(),
      userId: user.id,
      username: user.username,
      avatar: user.avatar,
      content: comment,
      createdAt: new Date(),
    }

    updateUpdate(update.id, {
      comments: [...update.comments, newComment],
    })

    setComment('')
    toast.success('Comment added!')
  }

  const handleShare = () => {
    setShowShareTemplates(true)
  }

  const typeColors = {
    learning: 'bg-accent/20 text-accent',
    achievement: 'bg-success/20 text-success',
    progress: 'bg-warning/20 text-warning',
    read: 'bg-text/20 text-text',
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <img
            src={update.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${update.username}`}
            alt={update.username}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{update.username}</h3>
              <span className={`px-2 py-0.5 rounded text-xs ${typeColors[update.type]}`}>
                {update.type}
              </span>
              {update.isBlockchainVerified && (
                <Shield className="w-4 h-4 text-success" title="Blockchain verified" />
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-text/60">
              <Clock className="w-3 h-3" />
              <span>{formatDistanceToNow(update.createdAt, { addSuffix: true })}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <p className="text-text mb-4 whitespace-pre-wrap">{update.content}</p>

        {/* Tags */}
        {update.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {update.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-hover border border-border rounded text-sm text-accent"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        {update.links.length > 0 && (
          <div className="mb-4 space-y-1">
            {update.links.map((link, i) => (
              <a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline text-sm block truncate"
              >
                {link}
              </a>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-6 pt-4 border-t border-border">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 transition-colors ${
              isLiked ? 'text-warning' : 'text-text/60 hover:text-warning'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            <span>{update.likes.length}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-text/60 hover:text-accent transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{update.comments.length}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-text/60 hover:text-accent transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Comments */}
        {showComments && (
          <div className="mt-4 pt-4 border-t border-border space-y-3">
            {update.comments.map((c) => (
              <div key={c.id} className="flex gap-2">
                <img
                  src={c.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${c.username}`}
                  alt={c.username}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1 bg-hover rounded-lg p-2">
                  <p className="font-semibold text-sm">{c.username}</p>
                  <p className="text-sm">{c.content}</p>
                </div>
              </div>
            ))}

            {user && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                  placeholder="Add a comment..."
                  className="input flex-1"
                />
                <button onClick={handleComment} className="btn-primary">
                  Post
                </button>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {showShareTemplates && (
        <ShareTemplates update={update} onClose={() => setShowShareTemplates(false)} />
      )}
    </>
  )
}