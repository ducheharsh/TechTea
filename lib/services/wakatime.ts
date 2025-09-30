import axios from 'axios'
import { WakatimeStats } from '@/lib/types'

export class WakatimeService {
  private apiKey: string | null = null
  private baseUrl = 'https://wakatime.com/api/v1'

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.WAKATIME_API_KEY || null
  }

  async getUserStats(username: string, range: 'today' | 'last_7_days' | 'last_30_days' = 'today'): Promise<WakatimeStats | null> {
    if (!this.apiKey) {
      console.warn('Wakatime not configured')
      return null
    }

    try {
      const response = await axios.get(
        `${this.baseUrl}/users/${username}/stats/${range}`,
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
        }
      )

      const data = response.data.data

      return {
        totalSeconds: data.total_seconds || 0,
        languages: data.languages?.map((lang: any) => ({
          name: lang.name,
          totalSeconds: lang.total_seconds,
        })) || [],
        editors: data.editors?.map((editor: any) => ({
          name: editor.name,
          totalSeconds: editor.total_seconds,
        })) || [],
        projects: data.projects?.map((project: any) => ({
          name: project.name,
          totalSeconds: project.total_seconds,
        })) || [],
      }
    } catch (error) {
      console.error('Wakatime API error:', error)
      return null
    }
  }

  formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }
}

export const wakatimeService = new WakatimeService()