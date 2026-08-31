import { NextResponse } from 'next/server'
import { db, orders } from '@/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { customer_name, email, whatsapp, service_type, requirements } = body

    if (!customer_name || !whatsapp) {
      return NextResponse.json(
        { error: 'Nama dan WhatsApp wajib diisi' },
        { status: 400 }
      )
    }

    const [newOrder] = await db
      .insert(orders)
      .values({
        customer_name,
        email: email || null,
        whatsapp,
        service_type: service_type || null,
        requirements: requirements || null,
        status: 'Pending',
      })
      .returning()

    return NextResponse.json({ success: true, data: newOrder }, { status: 200 })
  } catch (err: any) {
    console.error('Drizzle insert order error:', err)
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
