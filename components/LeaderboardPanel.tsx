'use client'

import { useStore } from '@/lib/store'
import { Trophy, TrendingUp, Award, Star, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface LeaderboardPanelProps {
  roomId: string
}

interface UserStats {
  username: string
  posts: number
  reactions: number
  streak: number
  score: number
  insights: string[]
}

export default function LeaderboardPanel({ roomId }: LeaderboardPanelProps) {
  const { rooms } = useStore()
  const room = rooms.find((r) => r.id === roomId)
  const [leaderboard, setLeaderboard] = useState<UserStats[]>([])
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'all'>('today')

  useEffect(() => {
    if (!room) return

    const stats = new Map<string, UserStats>()

    // Filter updates based on time range
    const now = new Date()
    const filteredUpdates = room.updates.filter((update) => {
      const updateDate = new Date(update.timestamp)
      if (timeRange === 'today') {
        return updateDate.toDateString() === now.toDateString()
      } else if (timeRange === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        return updateDate >= weekAgo
      }
      return true
    })

    // Calculate stats
    filteredUpdates.forEach((update) => {
      const current = stats.get(update.username) || {
        username: update.username,
        posts: 0,
        reactions: 0,
        streak: 0,
        score: 0,
        insights: [],
      }

      const totalReactions = Object.values(update.reactions).reduce(
        (acc: number, users: any) => acc + users.length,
        0
      )

      stats.set(update.username, {
        ...current,
        posts: current.posts + 1,
        reactions: current.reactions + totalReactions,
        score: current.score + (10 + totalReactions * 2),
      })
    })

    // Generate AI insights
    stats.forEach((userStats, username) => {
      const insights = []
      if (userStats.posts > 5) insights.push('🔥 Consistent learner')
      if (userStats.reactions > 10) insights.push('⭐ Community favorite')
      if (userStats.posts === filteredUpdates.length) insights.push('💯 Most active')
      if (userStats.reactions / userStats.posts > 5) insights.push('✨ Quality content')
      
      stats.set(username, { ...userStats, insights })
    })

    const sorted = Array.from(stats.values()).sort((a, b) => b.score - a.score)
    setLeaderboard(sorted)
  }, [room, timeRange])

  if (!room) return null

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          <Trophy className="w-5 h-5 text-warning" />
          Leaderboard
        </h3>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value as any)}
          className="text-xs bg-hover border border-border rounded px-2 py-1"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="all">All Time</option>
        </select>
      </div>

      <div className="space-y-3">
        {leaderboard.length > 0 ? (
          leaderboard.map((user, index) => (
            <motion.div
              key={user.username}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-3 rounded-lg ${
                index < 3 ? 'bg-hover border border-border' : 'bg-hover bg-opacity-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    index === 0
                      ? 'bg-warning text-primary'
                      : index === 1
                      ? 'bg-gray-400 text-primary'
                      : index === 2
                      ? 'bg-orange-600 text-primary'
                      : 'bg-secondary text-text'
                  }`}
                >
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-sm">{user.username}</h4>
                    {index === 0 && <Trophy className="w-4 h-4 text-warning" />}
                  </div>
                  <div className="flex gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {user.posts} posts
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {user.reactions} reactions
                    </span>
                  </div>
                  {user.insights.length > 0 && (
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {user.insights.map((insight, i) => (
                        <span
                          key={i}
                          className="text-xs bg-accent bg-opacity-20 text-accent px-2 py-0.5 rounded-full"
                        >
                          {insight}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-accent">{user.score}</div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400 text-sm">
            No activity yet for this period
          </div>
        )}
      </div>

      {/* AI Insights */}
      {leaderboard.length > 0 && (
        <div className="mt-4 p-3 bg-accent bg-opacity-10 border border-accent border-opacity-30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold">AI Insights</span>
          </div>
          <p className="text-xs text-gray-400">
            {leaderboard[0]?.username} is leading with consistent daily updates. 
            {leaderboard.length > 1 && ` ${leaderboard[1]?.username} is close behind!`}
            {' '}Keep the momentum going! 🚀
          </p>
        </div>
      )}
    </div>
  )
}