'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Menu, X, User, LogOut, Settings, Bell } from 'lucide-react'
import { useAuth } from '@/lib/contexts/AuthContext'
import { cn } from '@/lib/utils/cn'

export function Navbar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)

  const navItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Rooms', href: '/rooms' },
    { name: 'Leaderboard', href: '/leaderboard' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-secondary/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <span className="text-2xl">☕</span>
            TechTea
          </Link>

          {/* Desktop Navigation */}
          {user && (
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-accent',
                    pathname === item.href ? 'text-accent' : 'text-text/70'
                  )}
                >
                  {item.name}
                </Link>
              ))}

              {/* Notifications */}
              <button className="relative p-2 hover:bg-hover rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-warning rounded-full" />
              </button>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-2 p-2 hover:bg-hover rounded-lg transition-colors"
                >
                  <img
                    src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                    alt={user.username}
                    className="w-8 h-8 rounded-full"
                  />
                </button>

                {profileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 card"
                  >
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-hover rounded-lg transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-hover rounded-lg transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-hover rounded-lg transition-colors text-warning"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          {user && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-hover rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {user && mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden pb-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block px-4 py-2 rounded-lg transition-colors',
                  pathname === item.href
                    ? 'bg-accent/10 text-accent'
                    : 'hover:bg-hover text-text/70'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-border my-2" />
            <Link
              href="/profile"
              className="block px-4 py-2 rounded-lg hover:bg-hover transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Profile
            </Link>
            <Link
              href="/settings"
              className="block px-4 py-2 rounded-lg hover:bg-hover transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Settings
            </Link>
            <button
              onClick={() => {
                logout()
                setMobileMenuOpen(false)
              }}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-hover transition-colors text-warning"
            >
              Logout
            </button>
          </motion.div>
        )}
      </div>
    </nav>
  )
}