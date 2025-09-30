'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Download, X } from 'lucide-react'
import { Update } from '@/lib/types'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

interface ShareTemplatesProps {
  update: Update
  onClose: () => void
}

export function ShareTemplates({ update, onClose }: ShareTemplatesProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<'card' | 'timeline' | 'stats'>('card')
  const canvasRef = useRef<HTMLDivElement>(null)

  const templates = [
    { id: 'card', name: 'Card', description: 'Clean card layout' },
    { id: 'timeline', name: 'Timeline', description: 'Activity timeline' },
    { id: 'stats', name: 'Stats', description: 'Stats-focused' },
  ]

  const handleDownload = async () => {
    if (!canvasRef.current) return

    try {
      // Use html2canvas or similar library in production
      // For now, we'll just show a success message
      toast.success('Template downloaded! (Use html2canvas in production)')
    } catch (error) {
      toast.error('Failed to download template')
    }
  }

  const handleShare = async (platform: string) => {
    const text = `${update.content}\n\n#TechTea #${update.tags.join(' #')}`
    const url = window.location.href

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    }

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400')
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-secondary rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-secondary border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Share Update</h2>
          <button onClick={onClose} className="p-2 hover:bg-hover rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Template Selection */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Choose Template</h3>
            <div className="grid grid-cols-3 gap-4">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id as any)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedTemplate === template.id
                      ? 'border-accent bg-accent/10'
                      : 'border-border hover:border-accent/50'
                  }`}
                >
                  <div className="font-medium">{template.name}</div>
                  <div className="text-sm text-text/60">{template.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Preview</h3>
            <div ref={canvasRef} className="bg-primary rounded-lg overflow-hidden">
              {selectedTemplate === 'card' && <CardTemplate update={update} />}
              {selectedTemplate === 'timeline' && <TimelineTemplate update={update} />}
              {selectedTemplate === 'stats' && <StatsTemplate update={update} />}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-4">
            <button onClick={handleDownload} className="btn-primary flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Download as Image
            </button>

            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => handleShare('twitter')}
                className="btn-secondary"
              >
                Share on Twitter
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="btn-secondary"
              >
                Share on LinkedIn
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="btn-secondary"
              >
                Share on Facebook
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function CardTemplate({ update }: { update: Update }) {
  return (
    <div className="p-8 bg-gradient-to-br from-accent/20 to-success/20">
      <div className="bg-secondary/90 backdrop-blur rounded-lg p-6 border border-border">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={update.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${update.username}`}
            alt={update.username}
            className="w-12 h-12 rounded-full border-2 border-accent"
          />
          <div>
            <div className="font-bold text-lg">{update.username}</div>
            <div className="text-sm text-text/60">{format(update.createdAt, 'MMM d, yyyy')}</div>
          </div>
        </div>
        
        <p className="text-lg mb-4 leading-relaxed">{update.content}</p>
        
        {update.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {update.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
          <div className="text-2xl font-bold">☕ TechTea</div>
          <div className="text-sm text-text/60">techtea.app</div>
        </div>
      </div>
    </div>
  )
}

function TimelineTemplate({ update }: { update: Update }) {
  return (
    <div className="p-8 bg-gradient-to-br from-primary to-secondary">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-4xl font-bold mb-2">Daily Progress</div>
          <div className="text-text/60">{format(update.createdAt, 'EEEE, MMMM d, yyyy')}</div>
        </div>

        <div className="relative pl-8 border-l-2 border-accent">
          <div className="absolute left-[-9px] top-0 w-4 h-4 bg-accent rounded-full" />
          
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={update.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${update.username}`}
                alt={update.username}
                className="w-10 h-10 rounded-full"
              />
              <div className="font-bold">{update.username}</div>
            </div>
            
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-lg">{update.content}</p>
            </div>

            {update.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {update.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-accent/20 text-accent rounded text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-8 text-2xl font-bold">☕ TechTea</div>
      </div>
    </div>
  )
}

function StatsTemplate({ update }: { update: Update }) {
  const stats = [
    { label: 'Type', value: update.type },
    { label: 'Tags', value: update.tags.length },
    { label: 'Likes', value: update.likes.length },
    { label: 'Comments', value: update.comments.length },
  ]

  return (
    <div className="p-8 bg-gradient-to-br from-success/20 to-accent/20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold mb-2">📊 Learning Stats</div>
          <div className="text-text/60">{format(update.createdAt, 'MMM d, yyyy')}</div>
        </div>

        <div className="bg-secondary/90 backdrop-blur rounded-lg p-6 border border-border mb-6">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={update.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${update.username}`}
              alt={update.username}
              className="w-12 h-12 rounded-full border-2 border-accent"
            />
            <div className="font-bold text-xl">{update.username}</div>
          </div>

          <p className="text-lg mb-6">{update.content}</p>

          <div className="grid grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-3 bg-hover rounded-lg">
                <div className="text-2xl font-bold text-accent">{stat.value}</div>
                <div className="text-sm text-text/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold mb-1">☕ TechTea</div>
          <div className="text-sm text-text/60">Your daily tech learning companion</div>
        </div>
      </div>
    </div>
  )
}