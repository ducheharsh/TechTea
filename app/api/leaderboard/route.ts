import { NextRequest, NextResponse } from 'next/server'
import { leaderboardService } from '@/lib/services/leaderboard'

export async function POST(request: NextRequest) {
  try {
    const { roomId, members, updates } = await request.json()
    
    const leaderboard = await leaderboardService.generateDailyLeaderboard(
      roomId,
      members,
      updates
    )

    return NextResponse.json(leaderboard)
  } catch (error) {
    console.error('Leaderboard error:', error)
    return NextResponse.json({ error: 'Failed to generate leaderboard' }, { status: 500 })
  }
}