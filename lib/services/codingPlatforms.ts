import axios from 'axios'
import { CodingPlatformStats } from '@/lib/types'

export class CodingPlatformService {
  async getLeetCodeStats(username: string): Promise<CodingPlatformStats | null> {
    try {
      // Using a third-party API since LeetCode doesn't have official API
      const response = await axios.get(
        `https://leetcode-stats-api.herokuapp.com/${username}`
      )

      const data = response.data

      return {
        platform: 'leetcode',
        problemsSolved: data.totalSolved || 0,
        contestRating: data.ranking || 0,
        streak: data.streak || 0,
        recentSubmissions: data.recentSubmissions?.slice(0, 5).map((sub: any) => ({
          title: sub.title,
          difficulty: sub.difficulty,
          status: sub.statusDisplay,
          language: sub.lang,
        })) || [],
      }
    } catch (error) {
      console.error('LeetCode API error:', error)
      return null
    }
  }

  async getHackerRankStats(username: string): Promise<CodingPlatformStats | null> {
    try {
      // Mock implementation - HackerRank requires authentication
      // In production, you'd need to implement OAuth or use their API
      return {
        platform: 'hackerrank',
        problemsSolved: 0,
        contestRating: 0,
        streak: 0,
        recentSubmissions: [],
      }
    } catch (error) {
      console.error('HackerRank API error:', error)
      return null
    }
  }

  async getCodeChefStats(username: string): Promise<CodingPlatformStats | null> {
    try {
      // CodeChef has a public API
      const response = await axios.get(
        `https://www.codechef.com/users/${username}`
      )
      
      // Parse HTML or use their API if available
      // This is a simplified mock
      return {
        platform: 'codechef',
        problemsSolved: 0,
        contestRating: 0,
        streak: 0,
        recentSubmissions: [],
      }
    } catch (error) {
      console.error('CodeChef API error:', error)
      return null
    }
  }

  async getAllStats(usernames: {
    leetcode?: string
    hackerrank?: string
    codechef?: string
  }): Promise<CodingPlatformStats[]> {
    const stats: CodingPlatformStats[] = []

    if (usernames.leetcode) {
      const leetcodeStats = await this.getLeetCodeStats(usernames.leetcode)
      if (leetcodeStats) stats.push(leetcodeStats)
    }

    if (usernames.hackerrank) {
      const hackerrankStats = await this.getHackerRankStats(usernames.hackerrank)
      if (hackerrankStats) stats.push(hackerrankStats)
    }

    if (usernames.codechef) {
      const codechefStats = await this.getCodeChefStats(usernames.codechef)
      if (codechefStats) stats.push(codechefStats)
    }

    return stats
  }
}

export const codingPlatformService = new CodingPlatformService()