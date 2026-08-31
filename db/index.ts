import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL || ''

declare global {
  // eslint-disable-next-line no-var
  var _postgresClient: postgres.Sql | undefined
}

const client =
  globalThis._postgresClient ||
  postgres(connectionString, {
    prepare: false, // Required for Supabase connection poolers
    max: 10,
  })

if (process.env.NODE_ENV !== 'production') {
  globalThis._postgresClient = client
}

export const db = drizzle(client, { schema })
export * from './schema'
