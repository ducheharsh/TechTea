import { NextRequest, NextResponse } from 'next/server'

// Mock data store (replace with database in production)
let rooms: any[] = []

export async function GET(request: NextRequest) {
  return NextResponse.json(rooms)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const newRoom = {
      ...body,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    rooms.push(newRoom)

    return NextResponse.json(newRoom, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}