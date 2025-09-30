import { Octokit } from '@octokit/rest'
import { GitHubActivity } from '@/lib/types'

export class GitHubService {
  private octokit: Octokit | null = null

  constructor(token?: string) {
    const authToken = token || process.env.NEXT_PUBLIC_GITHUB_TOKEN
    if (authToken) {
      this.octokit = new Octokit({ auth: authToken })
    }
  }

  async getUserActivity(username: string, since?: Date): Promise<GitHubActivity[]> {
    if (!this.octokit) {
      console.warn('GitHub not configured')
      return []
    }

    try {
      const sinceDate = since || new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
      const events = await this.octokit.activity.listPublicEventsForUser({
        username,
        per_page: 100,
      })

      const activities: Map<string, GitHubActivity> = new Map()

      events.data
        .filter((event) => new Date(event.created_at) >= sinceDate)
        .forEach((event) => {
          const repo = event.repo.name

          if (!activities.has(repo)) {
            activities.set(repo, {
              type: 'repository',
              repo,
              commits: 0,
              additions: 0,
              deletions: 0,
              prs: 0,
              issues: 0,
            })
          }

          const activity = activities.get(repo)!

          switch (event.type) {
            case 'PushEvent':
              activity.commits! += (event.payload as any).commits?.length || 0
              break
            case 'PullRequestEvent':
              activity.prs! += 1
              break
            case 'IssuesEvent':
              activity.issues! += 1
              break
          }
        })

      return Array.from(activities.values())
    } catch (error) {
      console.error('GitHub API error:', error)
      return []
    }
  }

  async getCommitStats(username: string, repo: string, since?: Date): Promise<{ additions: number; deletions: number }> {
    if (!this.octokit) {
      return { additions: 0, deletions: 0 }
    }

    try {
      const sinceDate = since || new Date(Date.now() - 24 * 60 * 60 * 1000)
      const commits = await this.octokit.repos.listCommits({
        owner: username,
        repo: repo.split('/')[1],
        since: sinceDate.toISOString(),
      })

      let additions = 0
      let deletions = 0

      for (const commit of commits.data) {
        const commitDetail = await this.octokit.repos.getCommit({
          owner: username,
          repo: repo.split('/')[1],
          ref: commit.sha,
        })
        
        additions += commitDetail.data.stats?.additions || 0
        deletions += commitDetail.data.stats?.deletions || 0
      }

      return { additions, deletions }
    } catch (error) {
      console.error('GitHub commit stats error:', error)
      return { additions: 0, deletions: 0 }
    }
  }
}

export const githubService = new GitHubService()