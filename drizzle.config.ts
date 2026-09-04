import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: '.env.local' })

const rawConnectionString = (process.env.DATABASE_URL || '').trim()
const connectionString = rawConnectionString.replace(/^["']|["']$/g, '').trim()

export default defineConfig({
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: connectionString,
  },
})
