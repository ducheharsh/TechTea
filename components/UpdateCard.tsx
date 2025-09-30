'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { Heart, MessageCircle, Share2, Github, Clock, Shield } from 'lucide-react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { formatDistanceToNow } from 'date-fns'

interface UpdateCardProps {
  update: any
  roomId: string
  onShare: () => void
}

export default function UpdateCard({ update, roomId, onShare }: UpdateCardProps) {
  const { username, addReaction } = useStore()
  const [showReactions, setShowReactions] = useState(false)

  const reactions = ['❤️', '🔥', '👏', '💯', '🚀', '🎉']

  const handleReaction = (emoji: string) => {
    const userId = Date.now().toString()
    addReaction(roomId, update.id, emoji, userId)
    setShowReactions(false)
  }

  const totalReactions = Object.values(update.reactions).reduce(
    (acc: number, users: any) => acc + users.length,
    0
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="card hover:terminal-border transition-all duration-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center font-bold">
            {update.username[0].toUpperCase()}
          </div>
          <div>
            <h4 className="font-semibold">{update.username}</h4>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDistanceToNow(new Date(update.timestamp), { addSuffix: true })}
            </p>
          </div>
        </div>
        {update.blockchainHash && (
          <div className="flex items-center gap-1 text-xs text-success">
            <Shield className="w-3 h-3" />
            <span>Verified</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="prose prose-invert prose-sm max-w-none mb-4">
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || '')
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className="bg-hover px-1 py-0.5 rounded text-accent" {...props}>
                  {children}
                </code>
              )
            },
          }}
        >
          {update.content}
        </ReactMarkdown>
      </div>

      {/* Stats */}
      {(update.githubStats || update.wakatimeStats || update.codingStats) && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
          {update.githubStats && (
            <div className="bg-hover p-2 rounded-md">
              <div className="flex items-center gap-1 text-xs text-gray-400 mb-1">
                <Github className="w-3 h-3" />
                <span>GitHub</span>
              </div>
              <p className="text-sm font-semibold">{update.githubStats.commits} commits</p>
            </div>
          )}
          {update.wakatimeStats && (
            <div className="bg-hover p-2 rounded-md">
              <div className="flex items-center gap-1 text-xs text-gray-400 mb-1">
                <Clock className="w-3 h-3" />
                <span>Wakatime</span>
              </div>
              <p className="text-sm font-semibold">{update.wakatimeStats.hours}h coded</p>
            </div>
          )}
          {update.codingStats && (
            <div className="bg-hover p-2 rounded-md">
              <div className="text-xs text-gray-400 mb-1">{update.codingStats.platform}</div>
              <p className="text-sm font-semibold">{update.codingStats.solved} solved</p>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 pt-3 border-t border-border">
        <div className="relative">
          <button
            onClick={() => setShowReactions(!showReactions)}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-warning transition-colors"
          >
            <Heart className="w-4 h-4" />
            {totalReactions > 0 && <span>{totalReactions}</span>}
          </button>
          {showReactions && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute bottom-full left-0 mb-2 bg-secondary border border-border rounded-lg p-2 flex gap-2 shadow-lg"
            >
              {reactions.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleReaction(emoji)}
                  className="text-xl hover:scale-125 transition-transform"
                >
                  {emoji}
                </button>
              ))}
            </motion.div>
          )}
        </div>
        <button
          onClick={onShare}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>

      {/* Reaction Display */}
      {totalReactions > 0 && (
        <div className="flex gap-2 mt-3 flex-wrap">
          {Object.entries(update.reactions).map(([emoji, users]: [string, any]) =>
            users.length > 0 ? (
              <span
                key={emoji}
                className="bg-hover px-2 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {emoji} {users.length}
              </span>
            ) : null
          )}
        </div>
      )}
    </motion.div>
  )
}