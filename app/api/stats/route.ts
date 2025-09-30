import { NextResponse } from 'next/server'
import { getGitHubStats, getWakatimeStats } from '@/lib/integrations'

export async function POST(request: Request) {
  try {
    const { type, token, username } = await request.json()

    switch (type) {
      case 'github':
        const githubStats = await getGitHubStats(token, username)
        return NextResponse.json({ success: true, data: githubStats })
      
      case 'wakatime':
        const wakatimeStats = await getWakatimeStats(token)
        return NextResponse.json({ success: true, data: wakatimeStats })
      
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid type' },
          { status: 400 }
        )
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}