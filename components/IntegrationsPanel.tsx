'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { X, Github, Clock, Code2, Check, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

interface IntegrationsPanelProps {
  onClose: () => void
}

export default function IntegrationsPanel({ onClose }: IntegrationsPanelProps) {
  const { githubToken, wakatimeToken, setGithubToken, setWakatimeToken } = useStore()
  const [githubInput, setGithubInput] = useState(githubToken || '')
  const [wakatimeInput, setWakatimeInput] = useState(wakatimeToken || '')
  const [leetcodeUsername, setLeetcodeUsername] = useState('')
  const [hackerrankUsername, setHackerrankUsername] = useState('')
  const [codechefUsername, setCodechefUsername] = useState('')

  const handleSaveGithub = () => {
    setGithubToken(githubInput)
    toast.success('GitHub token saved!')
  }

  const handleSaveWakatime = () => {
    setWakatimeToken(wakatimeInput)
    toast.success('Wakatime token saved!')
  }

  const integrations = [
    {
      name: 'GitHub',
      icon: <Github className="w-6 h-6" />,
      description: 'Track commits, repos, and contribution stats',
      color: 'text-accent',
      connected: !!githubToken,
      input: githubInput,
      setInput: setGithubInput,
      onSave: handleSaveGithub,
      placeholder: 'Enter GitHub personal access token',
      link: 'https://github.com/settings/tokens',
    },
    {
      name: 'Wakatime',
      icon: <Clock className="w-6 h-6" />,
      description: 'Monitor coding time and language usage',
      color: 'text-success',
      connected: !!wakatimeToken,
      input: wakatimeInput,
      setInput: setWakatimeInput,
      onSave: handleSaveWakatime,
      placeholder: 'Enter Wakatime API key',
      link: 'https://wakatime.com/settings/api-key',
    },
  ]

  const codingPlatforms = [
    {
      name: 'LeetCode',
      username: leetcodeUsername,
      setUsername: setLeetcodeUsername,
      color: 'bg-warning',
    },
    {
      name: 'HackerRank',
      username: hackerrankUsername,
      setUsername: setHackerrankUsername,
      color: 'bg-success',
    },
    {
      name: 'CodeChef',
      username: codechefUsername,
      setUsername: setCodechefUsername,
      color: 'bg-orange-600',
    },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-secondary border border-border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-secondary border-b border-border p-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-bold">Integrations</h2>
            <p className="text-sm text-gray-400">Connect your dev tools and coding platforms</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-text">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Development Tools */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Development Tools</h3>
            <div className="space-y-4">
              {integrations.map((integration) => (
                <div
                  key={integration.name}
                  className="card border border-border hover:terminal-border transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className={`${integration.color} mt-1`}>
                      {integration.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{integration.name}</h4>
                        {integration.connected && (
                          <span className="flex items-center gap-1 text-xs text-success">
                            <Check className="w-3 h-3" />
                            Connected
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mb-3">
                        {integration.description}
                      </p>
                      <div className="flex gap-2">
                        <input
                          type="password"
                          value={integration.input}
                          onChange={(e) => integration.setInput(e.target.value)}
                          placeholder={integration.placeholder}
                          className="input flex-1 text-sm"
                        />
                        <button
                          onClick={integration.onSave}
                          className="btn-primary text-sm"
                        >
                          Save
                        </button>
                      </div>
                      <a
                        href={integration.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-accent hover:underline mt-2"
                      >
                        Get API Key
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coding Platforms */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Coding Platforms</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {codingPlatforms.map((platform) => (
                <div key={platform.name} className="card">
                  <div
                    className={`w-12 h-12 ${platform.color} rounded-lg flex items-center justify-center mb-3`}
                  >
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">{platform.name}</h4>
                  <input
                    type="text"
                    value={platform.username}
                    onChange={(e) => platform.setUsername(e.target.value)}
                    placeholder="Username"
                    className="input w-full text-sm"
                  />
                  <button
                    onClick={() => toast.success(`${platform.name} connected!`)}
                    className="btn-secondary w-full mt-2 text-sm"
                  >
                    Connect
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* How it works */}
          <div className="mt-8 p-4 bg-accent bg-opacity-10 border border-accent border-opacity-30 rounded-lg">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              How Integrations Work
            </h4>
            <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
              <li>Connect your GitHub to automatically fetch commit stats</li>
              <li>Link Wakatime to track coding time and language usage</li>
              <li>Add coding platform usernames to import problem-solving stats</li>
              <li>All data is synced when you post updates</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}