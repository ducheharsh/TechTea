'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { Plus, Lock, Users, Calendar, Search, Settings } from 'lucide-react'
import { motion } from 'framer-motion'
import CreateRoomModal from '@/components/CreateRoomModal'
import JoinRoomModal from '@/components/JoinRoomModal'
import { formatDistanceToNow } from 'date-fns'

export default function RoomsPage() {
  const router = useRouter()
  const { rooms, username, setUsername } = useStore()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const storedUsername = localStorage.getItem('username')
    if (!storedUsername) {
      router.push('/')
    } else {
      setUsername(storedUsername)
    }
  }, [router, setUsername])

  const filteredRooms = rooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const myRooms = filteredRooms.filter((room) => room.members.includes(username))
  const publicRooms = filteredRooms.filter(
    (room) => room.type === 'public' && !room.members.includes(username)
  )

  const handleRoomClick = (roomId: string, room: any) => {
    if (room.members.includes(username)) {
      router.push(`/room/${roomId}`)
    } else if (room.type === 'private') {
      setSelectedRoom(roomId)
    } else {
      useStore.getState().joinRoom(roomId, username)
      router.push(`/room/${roomId}`)
    }
  }

  return (
    <div className="min-h-screen bg-primary p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Learning Rooms</h1>
            <p className="text-gray-400">Join or create tech learning communities</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/settings')}
              className="btn-secondary flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create Room
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input w-full pl-10"
          />
        </div>

        {/* My Rooms */}
        {myRooms.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">My Rooms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {myRooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onClick={() => handleRoomClick(room.id, room)}
                  isMember={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* Public Rooms */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Discover Rooms</h2>
          {publicRooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {publicRooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onClick={() => handleRoomClick(room.id, room)}
                  isMember={false}
                />
              ))}
            </div>
          ) : (
            <div className="card text-center py-12 text-gray-400">
              <p>No public rooms available. Create one to get started!</p>
            </div>
          )}
        </div>
      </div>

      {showCreateModal && (
        <CreateRoomModal onClose={() => setShowCreateModal(false)} />
      )}
      {selectedRoom && (
        <JoinRoomModal
          roomId={selectedRoom}
          onClose={() => setSelectedRoom(null)}
        />
      )}
    </div>
  )
}

function RoomCard({
  room,
  onClick,
  isMember,
}: {
  room: any
  onClick: () => void
  isMember: boolean
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="card cursor-pointer hover:terminal-border transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold truncate flex-1">{room.name}</h3>
        {room.type === 'private' && (
          <Lock className="w-4 h-4 text-warning ml-2 flex-shrink-0" />
        )}
      </div>
      <p className="text-sm text-gray-400 mb-4 line-clamp-2">
        {room.description}
      </p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{room.members.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDistanceToNow(new Date(room.createdAt), { addSuffix: true })}</span>
          </div>
        </div>
        {isMember && (
          <span className="text-success font-semibold">Joined</span>
        )}
      </div>
    </motion.div>
  )
}