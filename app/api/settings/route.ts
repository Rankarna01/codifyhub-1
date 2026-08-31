import { NextResponse } from 'next/server'
import { db, settings } from '@/db'
import { sql } from 'drizzle-orm'

// GET all settings
export async function GET() {
  try {
    const data = await db.select().from(settings)
    // Ubah array [{key, value}] menjadi object {key: value}
    const formatted = Object.fromEntries(data.map((s) => [s.key, s.value]))
    return NextResponse.json({ data: formatted }, { status: 200 })
  } catch (error: any) {
    console.error('Drizzle get settings error:', error)
    return NextResponse.json({ error: error.message || 'Gagal memuat setting' }, { status: 500 })
  }
}

// POST: upsert settings
export async function POST(request: Request) {
  try {
    const body = await request.json() // { key: value, key2: value2, ... }
    const entries = Object.entries(body).map(([key, value]) => ({
      key,
      value: String(value ?? ''),
      updated_at: new Date(),
    }))

    if (entries.length === 0) {
      return NextResponse.json({ success: true })
    }

    await db
      .insert(settings)
      .values(entries)
      .onConflictDoUpdate({
        target: settings.key,
        set: {
          value: sql`excluded.value`,
          updated_at: sql`excluded.updated_at`,
        },
      })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    console.error('Drizzle upsert settings error:', error)
    return NextResponse.json({ error: error.message || 'Gagal menyimpan setting' }, { status: 500 })
  }
}
