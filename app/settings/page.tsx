'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Save, Github, Clock, Code2 } from 'lucide-react'
import { useAuth } from '@/lib/contexts/AuthContext'
import { Navbar } from '@/components/Navbar'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const router = useRouter()
  const { user, loading, updateProfile } = useAuth()
  const [bio, setBio] = useState('')
  const [githubUsername, setGithubUsername] = useState('')
  const [wakatimeUsername, setWakatimeUsername] = useState('')
  const [leetcodeUsername, setLeetcodeUsername] = useState('')
  const [hackerrankUsername, setHackerrankUsername] = useState('')
  const [codechefUsername, setCodechefUsername] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      setBio(user.bio || '')
      setGithubUsername(user.githubUsername || '')
      setWakatimeUsername(user.wakatimeUsername || '')
      setLeetcodeUsername(user.leetcodeUsername || '')
      setHackerrankUsername(user.hackerrankUsername || '')
      setCodechefUsername(user.codechefUsername || '')
    }
  }, [user])

  const handleSave = async () => {
    setSaving(true)
    
    try {
      await updateProfile({
        bio,
        githubUsername,
        wakatimeUsername,
        leetcodeUsername,
        hackerrankUsername,
        codechefUsername,
      })
      toast.success('Settings saved successfully!')
    } catch (error) {
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

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

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-text/60">Manage your profile and integrations</p>
        </div>

        <div className="space-y-6">
          {/* Profile Section */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Profile</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  value={user.username}
                  className="input"
                  disabled
                />
                <p className="text-sm text-text/60 mt-1">Username cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={user.email}
                  className="input"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="input min-h-[100px]"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
          </div>

          {/* Integrations Section */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Integrations</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Github className="w-5 h-5" />
                  GitHub Username
                </label>
                <input
                  type="text"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  className="input"
                  placeholder="octocat"
                />
                <p className="text-sm text-text/60 mt-1">
                  Connect your GitHub to track commits and contributions
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Wakatime Username
                </label>
                <input
                  type="text"
                  value={wakatimeUsername}
                  onChange={(e) => setWakatimeUsername(e.target.value)}
                  className="input"
                  placeholder="@username"
                />
                <p className="text-sm text-text/60 mt-1">
                  Connect Wakatime to track coding time
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Code2 className="w-5 h-5" />
                  Coding Platforms
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">LeetCode Username</label>
                    <input
                      type="text"
                      value={leetcodeUsername}
                      onChange={(e) => setLeetcodeUsername(e.target.value)}
                      className="input"
                      placeholder="username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">HackerRank Username</label>
                    <input
                      type="text"
                      value={hackerrankUsername}
                      onChange={(e) => setHackerrankUsername(e.target.value)}
                      className="input"
                      placeholder="username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">CodeChef Username</label>
                    <input
                      type="text"
                      value={codechefUsername}
                      onChange={(e) => setCodechefUsername(e.target.value)}
                      className="input"
                      placeholder="username"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}