import { NextRequest, NextResponse } from 'next/server'

// Mock data store (replace with database in production)
let updates: any[] = []

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const roomId = searchParams.get('roomId')

  if (roomId) {
    return NextResponse.json(updates.filter((u) => u.roomId === roomId))
  }

  return NextResponse.json(updates)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newUpdate = {
      ...body,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }

    updates.push(newUpdate)

    return NextResponse.json(newUpdate, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}