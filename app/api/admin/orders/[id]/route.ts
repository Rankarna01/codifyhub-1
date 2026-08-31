import { NextResponse } from 'next/server'
import { db, orders } from '@/db'
import { eq } from 'drizzle-orm'

// PATCH: update status order by id
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { status } = await request.json()

    const validStatuses = ['Pending', 'DP', 'Dikerjakan', 'Lunas', 'Batal']
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Status tidak valid' }, { status: 400 })
    }

    const [updated] = await db
      .update(orders)
      .set({ status })
      .where(eq(orders.id, id))
      .returning()

    if (!updated) {
      return NextResponse.json({ error: 'Order tidak ditemukan' }, { status: 404 })
    }

    return NextResponse.json({ data: updated })
  } catch (error: any) {
    console.error('Drizzle update order error:', error)
    return NextResponse.json({ error: error.message || 'Gagal update order' }, { status: 500 })
  }
}

// DELETE: hapus order
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const [deleted] = await db
      .delete(orders)
      .where(eq(orders.id, id))
      .returning()

    if (!deleted) {
      return NextResponse.json({ error: 'Order tidak ditemukan' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: deleted })
  } catch (error: any) {
    console.error('Drizzle delete order error:', error)
    return NextResponse.json({ error: error.message || 'Gagal menghapus order' }, { status: 500 })
  }
}
