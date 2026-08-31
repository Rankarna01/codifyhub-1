import { NextResponse } from 'next/server'
import { db, orders } from '@/db'
import { desc } from 'drizzle-orm'

// GET all orders
export async function GET() {
  try {
    const data = await db
      .select()
      .from(orders)
      .orderBy(desc(orders.created_at))

    return NextResponse.json({ data }, { status: 200 })
  } catch (error: any) {
    console.error('Drizzle get orders error:', error)
    return NextResponse.json({ error: error.message || 'Gagal memuat order' }, { status: 500 })
  }
}
