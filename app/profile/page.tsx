'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Settings, Github, Clock, Code2, TrendingUp, Calendar } from 'lucide-react'
import { useAuth } from '@/lib/contexts/AuthContext'
import { Navbar } from '@/components/Navbar'
import { useRoomStore } from '@/lib/stores/roomStore'
import { UpdateCard } from '@/components/UpdateCard'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

export default function ProfilePage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const { updates } = useRoomStore()

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

  const userUpdates = updates.filter((u) => u.userId === user.id)
  
  // Calculate streak
  const calculateStreak = () => {
    const sortedUpdates = [...userUpdates].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    
    let streak = 0
    let currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)

    for (const update of sortedUpdates) {
      const updateDate = new Date(update.createdAt)
      updateDate.setHours(0, 0, 0, 0)

      const diffDays = Math.floor(
        (currentDate.getTime() - updateDate.getTime()) / (1000 * 60 * 60 * 24)
      )

      if (diffDays === streak) {
        streak++
      } else if (diffDays > streak) {
        break
      }
    }

    return streak
  }

  const streak = calculateStreak()

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <img
              src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
              alt={user.username}
              className="w-32 h-32 rounded-full border-4 border-accent"
            />

            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
                  <p className="text-text/60">{user.bio || 'No bio yet'}</p>
                </div>
                <Link href="/settings" className="btn-secondary flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Edit Profile
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-hover p-4 rounded-lg">
                  <div className="text-2xl font-bold text-accent">{userUpdates.length}</div>
                  <div className="text-sm text-text/60">Total Updates</div>
                </div>
                <div className="bg-hover p-4 rounded-lg">
                  <div className="text-2xl font-bold text-warning">{streak}</div>
                  <div className="text-sm text-text/60">Day Streak</div>
                </div>
                <div className="bg-hover p-4 rounded-lg">
                  <div className="text-2xl font-bold text-success">
                    {userUpdates.reduce((sum, u) => sum + u.likes.length, 0)}
                  </div>
                  <div className="text-sm text-text/60">Total Likes</div>
                </div>
                <div className="bg-hover p-4 rounded-lg">
                  <div className="text-2xl font-bold text-text">
                    {userUpdates.filter((u) => u.isBlockchainVerified).length}
                  </div>
                  <div className="text-sm text-text/60">Verified Updates</div>
                </div>
              </div>

              {/* Integrations */}
              {(user.githubUsername || user.wakatimeUsername) && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {user.githubUsername && (
                    <a
                      href={`https://github.com/${user.githubUsername}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-hover border border-border rounded-lg hover:border-accent transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      <span>{user.githubUsername}</span>
                    </a>
                  )}
                  {user.wakatimeUsername && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-hover border border-border rounded-lg">
                      <Clock className="w-5 h-5" />
                      <span>{user.wakatimeUsername}</span>
                    </div>
                  )}
                  {(user.leetcodeUsername || user.hackerrankUsername || user.codechefUsername) && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-hover border border-border rounded-lg">
                      <Code2 className="w-5 h-5" />
                      <span>Coding Platforms Connected</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Your Activity
          </h2>

          {userUpdates.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-text/60 mb-4">You haven't shared any updates yet</p>
              <Link href="/dashboard" className="btn-primary">
                Share Your First Update
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {userUpdates.map((update) => (
                <UpdateCard key={update.id} update={update} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}