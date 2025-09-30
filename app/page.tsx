'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Coffee, Users, Award, Share2, Github, Code2, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  const router = useRouter()
  const [username, setUsername] = useState('')

  const handleStart = () => {
    if (username.trim()) {
      localStorage.setItem('username', username)
      router.push('/rooms')
    }
  }

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Learning Rooms',
      description: 'Create or join public/private tech learning communities',
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: 'Daily Updates',
      description: 'Share your progress with GitHub & Wakatime integration',
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: 'Social Sharing',
      description: 'Beautiful templates for sharing your achievements',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'AI Leaderboards',
      description: 'Competitive insights from coding platforms',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Platform Integration',
      description: 'Connect HackerRank, LeetCode, CodeChef & more',
    },
    {
      icon: <Github className="w-6 h-6" />,
      title: 'Blockchain Secured',
      description: 'Immutable updates powered by blockchain',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-primary via-primary to-secondary">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <Coffee className="w-12 h-12 text-accent" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-accent to-success bg-clip-text text-transparent">
              TechTea
            </h1>
          </motion.div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Share daily tech updates, learnings, and progress with your learning community.
            Track your journey, compete with friends, and grow together.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card hover:terminal-border transition-all duration-300 group"
            >
              <div className="text-accent mb-3 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Get Started */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="card max-w-md mx-auto terminal-border"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Get Started</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleStart()}
              className="input w-full"
            />
            <button
              onClick={handleStart}
              disabled={!username.trim()}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Enter TechTea
            </button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 text-sm text-gray-500"
        >
          <p>Built for developers, by developers ☕</p>
        </motion.div>
      </motion.div>
    </div>
  )
}