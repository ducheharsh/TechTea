import { LeaderboardEntry, Update, User } from '@/lib/types'
import { githubService } from './github'
import { wakatimeService } from './wakatime'
import { codingPlatformService } from './codingPlatforms'

export class LeaderboardService {
  async generateDailyLeaderboard(
    roomId: string,
    members: User[],
    updates: Update[]
  ): Promise<LeaderboardEntry[]> {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const leaderboard: LeaderboardEntry[] = []

    for (const member of members) {
      const memberUpdates = updates.filter(
        (u) => u.userId === member.id && new Date(u.createdAt) >= today
      )

      // Calculate metrics
      const score = await this.calculateScore(member, memberUpdates)
      const githubContributions = await this.getGitHubContributions(member)
      const codingTime = await this.getCodingTime(member)
      const problemsSolved = await this.getProblemsSolved(member)
      const streak = await this.getStreak(member.id, updates)

      // Generate AI insights
      const insights = this.generateInsights({
        updates: memberUpdates.length,
        githubContributions,
        codingTime,
        problemsSolved,
        streak,
      })

      leaderboard.push({
        userId: member.id,
        username: member.username,
        avatar: member.avatar,
        score,
        rank: 0, // Will be set after sorting
        updates: memberUpdates.length,
        githubContributions,
        codingTime,
        problemsSolved,
        streak,
        insights,
      })
    }

    // Sort by score and assign ranks
    leaderboard.sort((a, b) => b.score - a.score)
    leaderboard.forEach((entry, index) => {
      entry.rank = index + 1
    })

    return leaderboard
  }

  private async calculateScore(user: User, updates: Update[]): Promise<number> {
    let score = 0

    // Base points for updates
    score += updates.length * 10

    // Bonus for different types
    const types = new Set(updates.map((u) => u.type))
    score += types.size * 5

    // Bonus for blockchain verified updates
    score += updates.filter((u) => u.isBlockchainVerified).length * 15

    // Bonus for engagement
    updates.forEach((update) => {
      score += update.likes.length * 2
      score += update.comments.length * 3
    })

    // GitHub activity bonus
    if (user.githubUsername) {
      const activities = await githubService.getUserActivity(user.githubUsername)
      score += activities.reduce((sum, act) => sum + (act.commits || 0), 0) * 5
    }

    // Wakatime bonus
    if (user.wakatimeUsername) {
      const stats = await wakatimeService.getUserStats(user.wakatimeUsername, 'today')
      if (stats) {
        score += Math.floor(stats.totalSeconds / 3600) * 10 // 10 points per hour
      }
    }

    return score
  }

  private async getGitHubContributions(user: User): Promise<number> {
    if (!user.githubUsername) return 0

    try {
      const activities = await githubService.getUserActivity(user.githubUsername)
      return activities.reduce((sum, act) => sum + (act.commits || 0), 0)
    } catch {
      return 0
    }
  }

  private async getCodingTime(user: User): Promise<number> {
    if (!user.wakatimeUsername) return 0

    try {
      const stats = await wakatimeService.getUserStats(user.wakatimeUsername, 'today')
      return stats?.totalSeconds || 0
    } catch {
      return 0
    }
  }

  private async getProblemsSolved(user: User): Promise<number> {
    let total = 0

    try {
      const stats = await codingPlatformService.getAllStats({
        leetcode: user.leetcodeUsername,
        hackerrank: user.hackerrankUsername,
        codechef: user.codechefUsername,
      })

      total = stats.reduce((sum, s) => sum + (s.problemsSolved || 0), 0)
    } catch {
      // Ignore errors
    }

    return total
  }

  private async getStreak(userId: string, updates: Update[]): Promise<number> {
    const userUpdates = updates
      .filter((u) => u.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    let streak = 0
    let currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)

    for (const update of userUpdates) {
      const updateDate = new Date(update.createdAt)
      updateDate.setHours(0, 0, 0, 0)

      const diffDays = Math.floor(
        (currentDate.getTime() - updateDate.getTime()) / (1000 * 60 * 60 * 24)
      )

      if (diffDays === streak) {
        streak++
      } else if (diffDays > streak) {
        break
      }
    }

    return streak
  }

  private generateInsights(metrics: {
    updates: number
    githubContributions: number
    codingTime: number
    problemsSolved: number
    streak: number
  }): string[] {
    const insights: string[] = []

    if (metrics.streak >= 7) {
      insights.push(`🔥 ${metrics.streak} day streak! Keep it up!`)
    }

    if (metrics.githubContributions >= 10) {
      insights.push(`💪 ${metrics.githubContributions} commits today - you're on fire!`)
    }

    if (metrics.codingTime >= 3600 * 4) {
      insights.push(`⏰ ${Math.floor(metrics.codingTime / 3600)} hours of coding - dedication!`)
    }

    if (metrics.problemsSolved >= 5) {
      insights.push(`🎯 ${metrics.problemsSolved} problems solved - problem crusher!`)
    }

    if (metrics.updates >= 3) {
      insights.push(`📝 ${metrics.updates} updates shared - great engagement!`)
    }

    if (insights.length === 0) {
      insights.push('Keep learning and sharing your progress!')
    }

    return insights
  }
}

export const leaderboardService = new LeaderboardService()