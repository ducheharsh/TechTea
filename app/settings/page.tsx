'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { ArrowLeft, User, Bell, Shield, Trash2, Download } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const router = useRouter()
  const { username, setUsername, rooms } = useStore()
  const [localUsername, setLocalUsername] = useState(username)
  const [notifications, setNotifications] = useState(true)

  useEffect(() => {
    const storedUsername = localStorage.getItem('username')
    if (!storedUsername) {
      router.push('/')
    }
  }, [router])

  const handleSaveUsername = () => {
    if (localUsername.trim()) {
      setUsername(localUsername.trim())
      localStorage.setItem('username', localUsername.trim())
      toast.success('Username updated!')
    }
  }

  const handleExportData = () => {
    const data = {
      username,
      rooms,
      exportedAt: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `techtea-data-${Date.now()}.json`
    link.click()
    toast.success('Data exported!')
  }

  const handleClearData = () => {
    if (confirm('Are you sure? This will delete all your data.')) {
      localStorage.clear()
      toast.success('Data cleared!')
      router.push('/')
    }
  }

  return (
    <div className="min-h-screen bg-primary p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push('/rooms')}
            className="text-gray-400 hover:text-text transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-gray-400">Manage your account and preferences</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Profile */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={localUsername}
                    onChange={(e) => setLocalUsername(e.target.value)}
                    className="input flex-1"
                  />
                  <button onClick={handleSaveUsername} className="btn-primary">
                    Save
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <div className="text-2xl font-bold text-accent">
                    {rooms.filter((r) => r.members.includes(username)).length}
                  </div>
                  <div className="text-sm text-gray-400">Rooms Joined</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-success">
                    {rooms.reduce(
                      (acc, room) =>
                        acc +
                        room.updates.filter((u) => u.username === username).length,
                      0
                    )}
                  </div>
                  <div className="text-sm text-gray-400">Total Updates</div>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </h2>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm">Push Notifications</span>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="w-4 h-4"
                />
              </label>
              <p className="text-xs text-gray-500">
                Get notified when someone posts in your rooms
              </p>
            </div>
          </div>

          {/* Data & Privacy */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Data & Privacy
            </h2>
            <div className="space-y-3">
              <button
                onClick={handleExportData}
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export My Data
              </button>
              <button
                onClick={handleClearData}
                className="w-full flex items-center justify-center gap-2 bg-warning bg-opacity-10 text-warning border border-warning border-opacity-30 font-semibold px-4 py-2 rounded-md hover:bg-opacity-20 transition-all"
              >
                <Trash2 className="w-4 h-4" />
                Clear All Data
              </button>
            </div>
          </div>

          {/* About */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">About TechTea</h2>
            <div className="text-sm text-gray-400 space-y-2">
              <p>Version 1.0.0</p>
              <p>
                A Progressive Web App for tech learning communities. Share your
                daily progress, compete with friends, and grow together.
              </p>
              <div className="pt-4 border-t border-border">
                <p className="text-xs">
                  Built with Next.js, React, Tailwind CSS, and Blockchain
                  technology
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}