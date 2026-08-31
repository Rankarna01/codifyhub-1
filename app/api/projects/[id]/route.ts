import { NextResponse } from 'next/server'
import { db, projects } from '@/db'
import { eq } from 'drizzle-orm'

// PATCH: update project by ID
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, description, image_url, client_name, link } = body

    const updateData: Partial<typeof projects.$inferInsert> = {}
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (image_url !== undefined) updateData.image_url = image_url
    if (client_name !== undefined) updateData.client_name = client_name
    if (link !== undefined) updateData.link = link

    const [updated] = await db
      .update(projects)
      .set(updateData)
      .where(eq(projects.id, id))
      .returning()

    if (!updated) {
      return NextResponse.json({ error: 'Project tidak ditemukan' }, { status: 404 })
    }

    return NextResponse.json({ data: updated }, { status: 200 })
  } catch (error: any) {
    console.error('Drizzle update project error:', error)
    return NextResponse.json({ error: error.message || 'Gagal mengupdate project' }, { status: 500 })
  }
}

// DELETE: delete project by ID
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const [deleted] = await db
      .delete(projects)
      .where(eq(projects.id, id))
      .returning()

    if (!deleted) {
      return NextResponse.json({ error: 'Project tidak ditemukan' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: deleted }, { status: 200 })
  } catch (error: any) {
    console.error('Drizzle delete project error:', error)
    return NextResponse.json({ error: error.message || 'Gagal menghapus project' }, { status: 500 })
  }
}
