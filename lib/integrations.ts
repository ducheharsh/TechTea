import axios from 'axios'

// GitHub Integration
export async function getGitHubStats(token: string, username: string) {
  try {
    const headers = { Authorization: `token ${token}` }
    
    // Get user repos
    const reposResponse = await axios.get(
      `https://api.github.com/users/${username}/repos`,
      { headers }
    )
    
    // Get recent commits (simplified)
    let totalCommits = 0
    const repos = reposResponse.data.slice(0, 5) // Check last 5 repos
    
    for (const repo of repos) {
      try {
        const commitsResponse = await axios.get(
          `https://api.github.com/repos/${username}/${repo.name}/commits`,
          { headers, params: { per_page: 10 } }
        )
        totalCommits += commitsResponse.data.length
      } catch (err) {
        // Skip repos without commits
      }
    }

    return {
      commits: totalCommits,
      repos: repos.map((r: any) => r.name),
    }
  } catch (error) {
    console.error('GitHub API error:', error)
    return null
  }
}

// Wakatime Integration
export async function getWakatimeStats(apiKey: string) {
  try {
    const response = await axios.get(
      'https://wakatime.com/api/v1/users/current/summaries',
      {
        headers: { Authorization: `Basic ${btoa(apiKey)}` },
        params: {
          start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0],
          end: new Date().toISOString().split('T')[0],
        },
      }
    )

    const data = response.data.data[0]
    const totalSeconds = data?.grand_total?.total_seconds || 0
    const hours = Math.floor(totalSeconds / 3600)
    const languages = data?.languages?.map((l: any) => l.name) || []

    return {
      hours,
      languages: languages.slice(0, 3),
    }
  } catch (error) {
    console.error('Wakatime API error:', error)
    return null
  }
}

// LeetCode Stats (using public API)
export async function getLeetCodeStats(username: string) {
  try {
    const response = await axios.get(
      `https://leetcode-stats-api.herokuapp.com/${username}`
    )
    
    return {
      platform: 'LeetCode',
      solved: response.data.totalSolved || 0,
      rating: response.data.ranking || 0,
    }
  } catch (error) {
    console.error('LeetCode API error:', error)
    return null
  }
}

// HackerRank Stats (mock - would need actual API)
export async function getHackerRankStats(username: string) {
  // Note: HackerRank doesn't have a public API
  // This is a mock implementation
  return {
    platform: 'HackerRank',
    solved: Math.floor(Math.random() * 100),
    rating: Math.floor(Math.random() * 5000),
  }
}

// CodeChef Stats (using public API)
export async function getCodeChefStats(username: string) {
  try {
    // Note: CodeChef API requires authentication
    // This is a simplified mock
    return {
      platform: 'CodeChef',
      solved: Math.floor(Math.random() * 200),
      rating: Math.floor(Math.random() * 2500),
    }
  } catch (error) {
    console.error('CodeChef API error:', error)
    return null
  }
}

// Aggregate all coding platform stats
export async function getAllCodingStats(usernames: {
  leetcode?: string
  hackerrank?: string
  codechef?: string
}) {
  const results = await Promise.allSettled([
    usernames.leetcode ? getLeetCodeStats(usernames.leetcode) : null,
    usernames.hackerrank ? getHackerRankStats(usernames.hackerrank) : null,
    usernames.codechef ? getCodeChefStats(usernames.codechef) : null,
  ])

  return results
    .filter((r) => r.status === 'fulfilled' && r.value)
    .map((r: any) => r.value)
}