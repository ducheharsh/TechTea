import { create } from 'zustand'
import { Room, Update } from '@/lib/types'

interface RoomStore {
  rooms: Room[]
  currentRoom: Room | null
  updates: Update[]
  setRooms: (rooms: Room[]) => void
  addRoom: (room: Room) => void
  setCurrentRoom: (room: Room | null) => void
  setUpdates: (updates: Update[]) => void
  addUpdate: (update: Update) => void
  updateUpdate: (updateId: string, data: Partial<Update>) => void
}

export const useRoomStore = create<RoomStore>((set) => ({
  rooms: [],
  currentRoom: null,
  updates: [],
  setRooms: (rooms) => set({ rooms }),
  addRoom: (room) => set((state) => ({ rooms: [...state.rooms, room] })),
  setCurrentRoom: (room) => set({ currentRoom: room }),
  setUpdates: (updates) => set({ updates }),
  addUpdate: (update) => set((state) => ({ updates: [update, ...state.updates] })),
  updateUpdate: (updateId, data) =>
    set((state) => ({
      updates: state.updates.map((u) =>
        u.id === updateId ? { ...u, ...data } : u
      ),
    })),
}))