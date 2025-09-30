import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Update {
  id: string
  userId: string
  username: string
  content: string
  timestamp: Date
  blockchainHash?: string
  githubStats?: {
    commits: number
    repos: string[]
  }
  wakatimeStats?: {
    hours: number
    languages: string[]
  }
  codingStats?: {
    platform: string
    solved: number
    rating?: number
  }
  reactions: { [key: string]: string[] }
}

export interface Room {
  id: string
  name: string
  description: string
  type: 'public' | 'private'
  creator: string
  members: string[]
  updates: Update[]
  createdAt: Date
  password?: string
}

interface AppState {
  rooms: Room[]
  currentRoom: string | null
  username: string
  githubToken?: string
  wakatimeToken?: string
  addRoom: (room: Room) => void
  joinRoom: (roomId: string, username: string) => void
  leaveRoom: (roomId: string, username: string) => void
  addUpdate: (roomId: string, update: Update) => void
  addReaction: (roomId: string, updateId: string, emoji: string, userId: string) => void
  setCurrentRoom: (roomId: string | null) => void
  setUsername: (username: string) => void
  setGithubToken: (token: string) => void
  setWakatimeToken: (token: string) => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      rooms: [],
      currentRoom: null,
      username: '',
      addRoom: (room) =>
        set((state) => ({ rooms: [...state.rooms, room] })),
      joinRoom: (roomId, username) =>
        set((state) => ({
          rooms: state.rooms.map((room) =>
            room.id === roomId
              ? { ...room, members: [...room.members, username] }
              : room
          ),
        })),
      leaveRoom: (roomId, username) =>
        set((state) => ({
          rooms: state.rooms.map((room) =>
            room.id === roomId
              ? {
                  ...room,
                  members: room.members.filter((m) => m !== username),
                }
              : room
          ),
        })),
      addUpdate: (roomId, update) =>
        set((state) => ({
          rooms: state.rooms.map((room) =>
            room.id === roomId
              ? { ...room, updates: [...room.updates, update] }
              : room
          ),
        })),
      addReaction: (roomId, updateId, emoji, userId) =>
        set((state) => ({
          rooms: state.rooms.map((room) =>
            room.id === roomId
              ? {
                  ...room,
                  updates: room.updates.map((update) =>
                    update.id === updateId
                      ? {
                          ...update,
                          reactions: {
                            ...update.reactions,
                            [emoji]: [...(update.reactions[emoji] || []), userId],
                          },
                        }
                      : update
                  ),
                }
              : room
          ),
        })),
      setCurrentRoom: (roomId) => set({ currentRoom: roomId }),
      setUsername: (username) => set({ username }),
      setGithubToken: (token) => set({ githubToken: token }),
      setWakatimeToken: (token) => set({ wakatimeToken: token }),
    }),
    {
      name: 'techtea-storage',
    }
  )
)