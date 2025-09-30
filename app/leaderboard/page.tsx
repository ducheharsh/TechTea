'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Trophy, TrendingUp, Code2, GitBranch, Clock, Target, Sparkles } from 'lucide-react'
import { useAuth } from '@/lib/contexts/AuthContext'
import { Navbar } from '@/components/Navbar'
import { useRoomStore } from '@/lib/stores/roomStore'
import { leaderboardService } from '@/lib/services/leaderboard'
import { LeaderboardEntry } from '@/lib/types'
import { wakatimeService } from '@/lib/services/wakatime'

export default function LeaderboardPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const { rooms, updates } = useRoomStore()
  const [selectedRoom, setSelectedRoom] = useState<string>('')
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (rooms.length > 0 && !selectedRoom) {
      setSelectedRoom(rooms[0].id)
    }
  }, [rooms, selectedRoom])

  useEffect(() => {
    const loadLeaderboard = async () => {
      if (!selectedRoom) return

      setLoadingLeaderboard(true)
      const room = rooms.find((r) => r.id === selectedRoom)
      if (!room) return

      // Convert RoomMember[] to User[] for the leaderboard service
      const members = room.members.map((m) => ({
        id: m.userId,
        username: m.username,
        email: `${m.username}@example.com`,
        avatar: m.avatar,
        createdAt: m.joinedAt,
        updatedAt: new Date(),
      }))

      const data = await leaderboardService.generateDailyLeaderboard(
        selectedRoom,
        members,
        updates
      )

      setLeaderboard(data)
      setLoadingLeaderboard(false)
    }

    loadLeaderboard()
  }, [selectedRoom, rooms, updates])

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-warning'
      case 2:
        return 'text-text/80'
      case 3:
        return 'text-warning/60'
      default:
        return 'text-text/60'
    }
  }

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇'
      case 2:
        return '🥈'
      case 3:
        return '🥉'
      default:
        return `#${rank}`
    }
  }

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Trophy className="w-8 h-8 text-warning" />
            Daily Leaderboard
          </h1>
          <p className="text-text/60">AI-powered insights and rankings based on today's activity</p>
        </div>

        {/* Room Selector */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">Select Room</label>
          <select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            className="input max-w-md"
          >
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>

        {loadingLeaderboard ? (
          <div className="text-center py-12">
            <div className="text-xl">Calculating rankings...</div>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-text/60">No activity yet today. Start learning to see rankings!</p>
          </div>
        ) : (
          <>
            {/* Top 3 Podium */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {leaderboard.slice(0, 3).map((entry, index) => (
                <motion.div
                  key={entry.userId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`card terminal-glow ${
                    entry.rank === 1 ? 'order-2 md:scale-105' : entry.rank === 2 ? 'order-1' : 'order-3'
                  }`}
                >
                  <div className="text-center">
                    <div className={`text-4xl mb-4 ${getRankColor(entry.rank)}`}>
                      {getRankEmoji(entry.rank)}
                    </div>
                    <img
                      src={entry.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.username}`}
                      alt={entry.username}
                      className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-accent"
                    />
                    <h3 className="font-bold text-xl mb-2">{entry.username}</h3>
                    <div className="text-3xl font-bold text-accent mb-4">{entry.score} pts</div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-hover p-2 rounded">
                        <div className="text-text/60">Updates</div>
                        <div className="font-semibold">{entry.updates}</div>
                      </div>
                      <div className="bg-hover p-2 rounded">
                        <div className="text-text/60">Commits</div>
                        <div className="font-semibold">{entry.githubContributions}</div>
                      </div>
                      <div className="bg-hover p-2 rounded">
                        <div className="text-text/60">Coding</div>
                        <div className="font-semibold">{wakatimeService.formatDuration(entry.codingTime)}</div>
                      </div>
                      <div className="bg-hover p-2 rounded">
                        <div className="text-text/60">Streak</div>
                        <div className="font-semibold">{entry.streak} days</div>
                      </div>
                    </div>

                    {entry.insights && entry.insights.length > 0 && (
                      <div className="mt-4 p-3 bg-accent/10 border border-accent/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-2 text-accent">
                          <Sparkles className="w-4 h-4" />
                          <span className="text-sm font-semibold">AI Insights</span>
                        </div>
                        {entry.insights.map((insight, i) => (
                          <div key={i} className="text-sm text-text/80">
                            {insight}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Full Leaderboard */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-6">Full Rankings</h2>
              <div className="space-y-3">
                {leaderboard.map((entry, index) => (
                  <motion.div
                    key={entry.userId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                      entry.userId === user.id ? 'bg-accent/10 border border-accent' : 'bg-hover'
                    }`}
                  >
                    <div className={`text-2xl font-bold w-12 text-center ${getRankColor(entry.rank)}`}>
                      {entry.rank <= 3 ? getRankEmoji(entry.rank) : `#${entry.rank}`}
                    </div>

                    <img
                      src={entry.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.username}`}
                      alt={entry.username}
                      className="w-12 h-12 rounded-full"
                    />

                    <div className="flex-1">
                      <div className="font-semibold flex items-center gap-2">
                        {entry.username}
                        {entry.userId === user.id && (
                          <span className="text-xs px-2 py-0.5 bg-accent/20 text-accent rounded">You</span>
                        )}
                      </div>
                      <div className="text-sm text-text/60">
                        {entry.updates} updates • {entry.githubContributions} commits • {entry.problemsSolved} problems
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-accent">{entry.score}</div>
                      <div className="text-sm text-text/60">points</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}