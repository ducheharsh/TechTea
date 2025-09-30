'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, Plus, Globe, Lock } from 'lucide-react'
import { useAuth } from '@/lib/contexts/AuthContext'
import { Navbar } from '@/components/Navbar'
import { RoomCard } from '@/components/RoomCard'
import { CreateRoomModal } from '@/components/modals/CreateRoomModal'
import { JoinRoomModal } from '@/components/modals/JoinRoomModal'
import { useRoomStore } from '@/lib/stores/roomStore'

export default function RoomsPage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const { rooms } = useRoomStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [showCreateRoom, setShowCreateRoom] = useState(false)
  const [showJoinRoom, setShowJoinRoom] = useState(false)
  const [filter, setFilter] = useState<'all' | 'public' | 'private'>('all')

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

  const filteredRooms = rooms
    .filter((room) => {
      const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           room.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFilter = filter === 'all' || 
                           (filter === 'public' && !room.isPrivate) ||
                           (filter === 'private' && room.isPrivate)
      return matchesSearch && matchesFilter
    })

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Learning Rooms</h1>
            <p className="text-text/60">Join or create rooms to learn with friends</p>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setShowJoinRoom(true)} className="btn-secondary flex items-center gap-2">
              <Search className="w-5 h-5" />
              Join Room
            </button>
            <button onClick={() => setShowCreateRoom(true)} className="btn-primary flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create Room
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rooms..."
              className="input pl-10 w-full"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('public')}
              className={`btn ${filter === 'public' ? 'btn-primary' : 'btn-secondary'} flex items-center gap-2`}
            >
              <Globe className="w-4 h-4" />
              Public
            </button>
            <button
              onClick={() => setFilter('private')}
              className={`btn ${filter === 'private' ? 'btn-primary' : 'btn-secondary'} flex items-center gap-2`}
            >
              <Lock className="w-4 h-4" />
              Private
            </button>
          </div>
        </div>

        {/* Rooms Grid */}
        {filteredRooms.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-text/60 mb-4">
              {searchQuery ? 'No rooms found matching your search.' : 'No rooms yet.'}
            </p>
            <button onClick={() => setShowCreateRoom(true)} className="btn-primary">
              Create Your First Room
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </div>

      {showCreateRoom && <CreateRoomModal onClose={() => setShowCreateRoom(false)} />}
      {showJoinRoom && <JoinRoomModal onClose={() => setShowJoinRoom(false)} />}
    </div>
  )
}