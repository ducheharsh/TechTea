'use client'

import { useState, useRef } from 'react'
import { X, Twitter, Linkedin, Download, Copy, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { toPng } from 'html-to-image'
import toast from 'react-hot-toast'

interface ShareModalProps {
  update: any
  onClose: () => void
}

export default function ShareModal({ update, onClose }: ShareModalProps) {
  const [template, setTemplate] = useState<'minimal' | 'detailed' | 'stats'>('minimal')
  const [copied, setCopied] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleCopyLink = () => {
    const text = `Check out my tech progress!\n\n${update.content}\n\n- ${update.username} on TechTea`
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadImage = async () => {
    if (!cardRef.current) return

    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
      })
      const link = document.createElement('a')
      link.download = `techtea-update-${Date.now()}.png`
      link.href = dataUrl
      link.click()
      toast.success('Image downloaded!')
    } catch (err) {
      toast.error('Failed to download image')
    }
  }

  const shareToTwitter = () => {
    const text = `${update.content.slice(0, 200)}${update.content.length > 200 ? '...' : ''}\n\n🚀 Shared from TechTea`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
    window.open(url, '_blank')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-secondary border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-secondary border-b border-border p-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold">Share Your Progress</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-text">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Template Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Choose Template</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setTemplate('minimal')}
                className={`p-3 rounded-lg border transition-all ${
                  template === 'minimal'
                    ? 'border-accent bg-accent bg-opacity-10'
                    : 'border-border hover:border-gray-500'
                }`}
              >
                <div className="text-sm font-medium">Minimal</div>
              </button>
              <button
                onClick={() => setTemplate('detailed')}
                className={`p-3 rounded-lg border transition-all ${
                  template === 'detailed'
                    ? 'border-accent bg-accent bg-opacity-10'
                    : 'border-border hover:border-gray-500'
                }`}
              >
                <div className="text-sm font-medium">Detailed</div>
              </button>
              <button
                onClick={() => setTemplate('stats')}
                className={`p-3 rounded-lg border transition-all ${
                  template === 'stats'
                    ? 'border-accent bg-accent bg-opacity-10'
                    : 'border-border hover:border-gray-500'
                }`}
              >
                <div className="text-sm font-medium">Stats</div>
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Preview</label>
            <div
              ref={cardRef}
              className="bg-primary border border-border rounded-lg p-6 terminal-border"
            >
              {template === 'minimal' && (
                <div>
                  <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-accent to-success bg-clip-text text-transparent">
                    TechTea
                  </div>
                  <p className="text-lg mb-4">{update.content}</p>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center font-bold">
                      {update.username[0].toUpperCase()}
                    </div>
                    <span>{update.username}</span>
                  </div>
                </div>
              )}

              {template === 'detailed' && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl font-bold bg-gradient-to-r from-accent to-success bg-clip-text text-transparent">
                      TechTea
                    </div>
                    <span className="text-sm text-gray-500">Learning Progress</span>
                  </div>
                  <div className="bg-secondary border border-border rounded-lg p-4 mb-4">
                    <p className="text-base leading-relaxed">{update.content}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center font-bold">
                        {update.username[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold">{update.username}</div>
                        <div className="text-xs text-gray-400">Tech Learner</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(update.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              )}

              {template === 'stats' && (
                <div>
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-accent to-success bg-clip-text text-transparent">
                      Daily Progress
                    </div>
                    <div className="text-sm text-gray-400">by {update.username}</div>
                  </div>
                  <div className="bg-secondary border border-border rounded-lg p-4 mb-4">
                    <p className="text-sm leading-relaxed line-clamp-3">{update.content}</p>
                  </div>
                  {(update.githubStats || update.wakatimeStats || update.codingStats) && (
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {update.githubStats && (
                        <div className="bg-hover p-3 rounded-lg text-center">
                          <div className="text-2xl font-bold text-success">
                            {update.githubStats.commits}
                          </div>
                          <div className="text-xs text-gray-400">Commits</div>
                        </div>
                      )}
                      {update.wakatimeStats && (
                        <div className="bg-hover p-3 rounded-lg text-center">
                          <div className="text-2xl font-bold text-accent">
                            {update.wakatimeStats.hours}h
                          </div>
                          <div className="text-xs text-gray-400">Coded</div>
                        </div>
                      )}
                      {update.codingStats && (
                        <div className="bg-hover p-3 rounded-lg text-center">
                          <div className="text-2xl font-bold text-warning">
                            {update.codingStats.solved}
                          </div>
                          <div className="text-xs text-gray-400">Problems</div>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="text-center text-xs text-gray-500">
                    Powered by TechTea ☕
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Share Options */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              onClick={shareToTwitter}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <Twitter className="w-4 h-4" />
              Twitter
            </button>
            <button
              onClick={shareToLinkedIn}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </button>
            <button
              onClick={handleDownloadImage}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={handleCopyLink}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}