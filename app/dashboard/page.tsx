'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Plus, TrendingUp, Users, Code2, Trophy } from 'lucide-react'
import { useAuth } from '@/lib/contexts/AuthContext'
import { Navbar } from '@/components/Navbar'
import { RoomCard } from '@/components/RoomCard'
import { UpdateCard } from '@/components/UpdateCard'
import { StatsCard } from '@/components/StatsCard'
import { CreateRoomModal } from '@/components/modals/CreateRoomModal'
import { CreateUpdateModal } from '@/components/modals/CreateUpdateModal'
import { useRoomStore } from '@/lib/stores/roomStore'
import { Room, Update } from '@/lib/types'

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const { rooms, updates, setRooms, setUpdates } = useRoomStore()
  const [showCreateRoom, setShowCreateRoom] = useState(false)
  const [showCreateUpdate, setShowCreateUpdate] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    // Load mock data
    const mockRooms: Room[] = [
      {
        id: '1',
        name: 'Web Development Squad',
        description: 'Learning full-stack web development together',
        isPrivate: false,
        createdBy: user?.id || '1',
        members: [
          { userId: '1', username: 'you', role: 'owner', joinedAt: new Date() },
          { userId: '2', username: 'dev_friend', role: 'member', joinedAt: new Date() },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'DSA Grind',
        description: 'Daily LeetCode and algorithm practice',
        isPrivate: false,
        createdBy: '2',
        members: [
          { userId: '1', username: 'you', role: 'member', joinedAt: new Date() },
          { userId: '2', username: 'algo_master', role: 'owner', joinedAt: new Date() },
          { userId: '3', username: 'code_ninja', role: 'member', joinedAt: new Date() },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const mockUpdates: Update[] = [
      {
        id: '1',
        roomId: '1',
        userId: '2',
        username: 'dev_friend',
        content: 'Just deployed my first Next.js 14 app with the new App Router! The server components are a game changer 🚀',
        type: 'achievement',
        tags: ['nextjs', 'react', 'deployment'],
        links: ['https://github.com/user/project'],
        isBlockchainVerified: true,
        blockchainTxHash: '0x123...',
        likes: ['1'],
        comments: [],
        createdAt: new Date(Date.now() - 3600000),
      },
      {
        id: '2',
        roomId: '2',
        userId: '3',
        username: 'code_ninja',
        content: 'Solved 5 hard problems on LeetCode today! Topics: Dynamic Programming, Graphs',
        type: 'progress',
        tags: ['leetcode', 'algorithms', 'dp'],
        links: [],
        isBlockchainVerified: true,
        likes: ['1', '2'],
        comments: [
          {
            id: '1',
            userId: '1',
            username: 'you',
            content: 'Awesome work! Which problems?',
            createdAt: new Date(),
          },
        ],
        createdAt: new Date(Date.now() - 7200000),
      },
    ]

    setRooms(mockRooms)
    setUpdates(mockUpdates)
  }, [user])

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            icon={Users}
            label="Rooms Joined"
            value={rooms.length.toString()}
            color="accent"
          />
          <StatsCard
            icon={Code2}
            label="Updates Posted"
            value={updates.filter((u) => u.userId === user.id).length.toString()}
            color="success"
          />
          <StatsCard
            icon={TrendingUp}
            label="Current Streak"
            value="7 days"
            color="warning"
          />
          <StatsCard
            icon={Trophy}
            label="Leaderboard Rank"
            value="#2"
            color="accent"
          />
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setShowCreateRoom(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Room
          </button>
          <button
            onClick={() => setShowCreateUpdate(true)}
            className="btn-secondary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Share Update
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold mb-4">Recent Updates</h2>
            {updates.length === 0 ? (
              <div className="card text-center py-12">
                <p className="text-text/60">No updates yet. Share your first learning!</p>
              </div>
            ) : (
              updates.map((update) => (
                <UpdateCard key={update.id} update={update} />
              ))
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Your Rooms</h3>
              <div className="space-y-4">
                {rooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCreateRoom && <CreateRoomModal onClose={() => setShowCreateRoom(false)} />}
      {showCreateUpdate && <CreateUpdateModal onClose={() => setShowCreateUpdate(false)} />}
    </div>
  )
}