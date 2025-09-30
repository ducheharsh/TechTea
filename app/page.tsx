'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, Users, Trophy, Share2, GitBranch, Zap } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/lib/contexts/AuthContext'

export default function Home() {
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const features = [
    {
      icon: Users,
      title: 'Learning Rooms',
      description: 'Create or join public/private rooms with your tech friends',
    },
    {
      icon: Code2,
      title: 'Daily Updates',
      description: 'Share learnings, progress, and achievements immutably on blockchain',
    },
    {
      icon: GitBranch,
      title: 'Platform Integration',
      description: 'Connect GitHub, Wakatime, LeetCode, HackerRank, and more',
    },
    {
      icon: Trophy,
      title: 'AI Leaderboards',
      description: 'Compete with friends on AI-powered daily leaderboards',
    },
    {
      icon: Share2,
      title: 'Social Sharing',
      description: 'Share beautiful update templates on social media',
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Get instant notifications and live activity feeds',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-success/10" />
        
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-accent to-success bg-clip-text text-transparent">
              TechTea ☕
            </h1>
            <p className="text-xl md:text-2xl text-text/80 mb-8 max-w-3xl mx-auto">
              A tech learning community where you and your friends share daily updates, 
              learnings, and progress in organized rooms with blockchain-powered immutability.
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              {user ? (
                <Link href="/dashboard" className="btn-primary text-lg">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/auth/signup" className="btn-primary text-lg">
                    Get Started
                  </Link>
                  <Link href="/auth/login" className="btn-secondary text-lg">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Core Features
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card group hover:terminal-glow"
              >
                <feature.icon className="w-10 h-10 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-text/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 px-4 bg-hover">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Built with Modern Tech
            </h2>
            <div className="flex flex-wrap justify-center gap-4 text-text/70">
              <span className="px-4 py-2 bg-secondary border border-border rounded-lg">Next.js 14</span>
              <span className="px-4 py-2 bg-secondary border border-border rounded-lg">TypeScript</span>
              <span className="px-4 py-2 bg-secondary border border-border rounded-lg">Blockchain</span>
              <span className="px-4 py-2 bg-secondary border border-border rounded-lg">AI-Powered</span>
              <span className="px-4 py-2 bg-secondary border border-border rounded-lg">Real-time</span>
              <span className="px-4 py-2 bg-secondary border border-border rounded-lg">PWA</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto text-center text-text/60">
          <p>© 2025 TechTea. Built for tech learners, by tech learners.</p>
        </div>
      </footer>
    </div>
  )
}