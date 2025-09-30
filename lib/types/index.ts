export interface User {
  id: string
  username: string
  email: string
  avatar?: string
  bio?: string
  githubUsername?: string
  wakatimeUsername?: string
  leetcodeUsername?: string
  hackerrankUsername?: string
  codechefUsername?: string
  walletAddress?: string
  createdAt: Date
  updatedAt: Date
}

export interface Room {
  id: string
  name: string
  description: string
  isPrivate: boolean
  coverImage?: string
  createdBy: string
  members: RoomMember[]
  inviteCode?: string
  createdAt: Date
  updatedAt: Date
}

export interface RoomMember {
  userId: string
  username: string
  avatar?: string
  role: 'owner' | 'admin' | 'member'
  joinedAt: Date
}

export interface Update {
  id: string
  roomId: string
  userId: string
  username: string
  avatar?: string
  content: string
  type: 'learning' | 'achievement' | 'progress' | 'read'
  tags: string[]
  links: string[]
  githubActivity?: GitHubActivity[]
  wakatimeStats?: WakatimeStats
  codingPlatformStats?: CodingPlatformStats
  blockchainTxHash?: string
  isBlockchainVerified: boolean
  likes: string[]
  comments: Comment[]
  createdAt: Date
}

export interface Comment {
  id: string
  userId: string
  username: string
  avatar?: string
  content: string
  createdAt: Date
}

export interface GitHubActivity {
  type: string
  repo: string
  commits?: number
  additions?: number
  deletions?: number
  prs?: number
  issues?: number
}

export interface WakatimeStats {
  totalSeconds: number
  languages: { name: string; totalSeconds: number }[]
  editors: { name: string; totalSeconds: number }[]
  projects: { name: string; totalSeconds: number }[]
}

export interface CodingPlatformStats {
  platform: 'leetcode' | 'hackerrank' | 'codechef'
  problemsSolved?: number
  contestRating?: number
  streak?: number
  recentSubmissions?: {
    title: string
    difficulty: string
    status: string
    language: string
  }[]
}

export interface LeaderboardEntry {
  userId: string
  username: string
  avatar?: string
  score: number
  rank: number
  updates: number
  githubContributions: number
  codingTime: number
  problemsSolved: number
  streak: number
  insights?: string[]
}

export interface Notification {
  id: string
  userId: string
  type: 'room_invite' | 'new_update' | 'comment' | 'like' | 'achievement'
  title: string
  message: string
  link?: string
  isRead: boolean
  createdAt: Date
}

export interface ShareTemplate {
  id: string
  name: string
  type: 'daily' | 'weekly' | 'achievement'
  backgroundColor: string
  textColor: string
  accentColor: string
  layout: 'card' | 'timeline' | 'stats'
}