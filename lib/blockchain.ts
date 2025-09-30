import { ethers } from 'ethers'

// Simple blockchain hash simulation
export async function hashUpdate(content: string, author: string): Promise<string> {
  const data = `${content}|${author}|${Date.now()}`
  const encoder = new TextEncoder()
  const dataBuffer = encoder.encode(data)
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  return `0x${hashHex}`
}

// Verify blockchain hash
export async function verifyUpdate(
  content: string,
  author: string,
  hash: string,
  timestamp: number
): Promise<boolean> {
  const data = `${content}|${author}|${timestamp}`
  const encoder = new TextEncoder()
  const dataBuffer = encoder.encode(data)
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  return `0x${hashHex}` === hash
}

// Mock smart contract interaction
export class UpdateContract {
  private updates: Map<string, any> = new Map()

  async storeUpdate(update: any): Promise<string> {
    const hash = await hashUpdate(update.content, update.username)
    this.updates.set(hash, {
      ...update,
      blockNumber: Date.now(),
      confirmed: true,
    })
    return hash
  }

  async getUpdate(hash: string): Promise<any> {
    return this.updates.get(hash)
  }

  async getAllUpdates(): Promise<any[]> {
    return Array.from(this.updates.values())
  }
}

export const contract = new UpdateContract()