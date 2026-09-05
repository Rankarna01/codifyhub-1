import { NextResponse } from 'next/server'
import { db, projects } from '@/db'
import { desc } from 'drizzle-orm'

export const dynamic = 'force-dynamic'

// GET all projects
export async function GET() {
  try {
    const data = await db
      .select()
      .from(projects)
      .orderBy(desc(projects.created_at))

    return NextResponse.json({ data }, { status: 200 })
  } catch (error: any) {
    console.error('Drizzle get projects error:', error)
    return NextResponse.json({ error: error.message || 'Gagal memuat projects' }, { status: 500 })
  }
}

// POST: create a new project
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, image_url, second_image_url, client_name, link } = body

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Judul dan deskripsi project wajib diisi' },
        { status: 400 }
      )
    }

    const [newProject] = await db
      .insert(projects)
      .values({
        title,
        description,
        image_url: image_url || null,
        second_image_url: second_image_url || null,
        client_name: client_name || null,
        link: link || null,
      })
      .returning()

    return NextResponse.json({ success: true, data: newProject }, { status: 200 })
  } catch (error: any) {
    console.error('Drizzle create project error:', error)
    return NextResponse.json({ error: error.message || 'Gagal menyimpan project' }, { status: 500 })
  }
}
