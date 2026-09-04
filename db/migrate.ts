import postgres from 'postgres'
import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'

config({ path: '.env.local' })

const rawConnectionString = (process.env.DATABASE_URL || '').trim()
const connectionString = rawConnectionString.replace(/^["']|["']$/g, '').trim()
if (!connectionString) {
  console.error('❌ DATABASE_URL tidak ditemukan di .env.local')
  process.exit(1)
}

const sql = postgres(connectionString, { prepare: false })

async function runMigrations() {
  try {
    console.log('🔄 Menjalankan migrasi Drizzle ke Supabase PostgreSQL...')
    const drizzleDir = path.join(process.cwd(), 'drizzle')
    
    if (!fs.existsSync(drizzleDir)) {
      console.log('Tidak ada folder drizzle/ yang ditemukan.')
      return
    }

    const files = fs.readdirSync(drizzleDir).filter(f => f.endsWith('.sql')).sort()

    for (const file of files) {
      console.log(`📄 Mengeksekusi: ${file}`)
      const filePath = path.join(drizzleDir, file)
      const content = fs.readFileSync(filePath, 'utf8')
      const statements = content.split('--> statement-breakpoint')

      for (const statement of statements) {
        const query = statement.trim()
        if (query) {
          try {
            await sql.unsafe(query)
          } catch (err: any) {
            // Abaikan jika tabel atau enum sudah ada
            if (err.code === '42P07' || err.message?.includes('already exists')) {
              console.log(`ℹ️ Objek database sudah ada: ${err.message}`)
            } else {
              throw err
            }
          }
        }
      }
    }

    console.log('✅ Semua migrasi berhasil terverifikasi!')

    const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
    console.log('📊 Tabel aktif di Supabase:', tables.map(t => t.table_name).join(', '))
  } catch (error) {
    console.error('❌ Terjadi kesalahan saat migrasi:', error)
  } finally {
    await sql.end()
  }
}

runMigrations()
