import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  customer_name: text('customer_name').notNull(),
  email: text('email'),
  whatsapp: text('whatsapp').notNull(),
  service_type: text('service_type'),
  requirements: text('requirements'),
  status: text('status').default('Pending').notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export type Order = typeof orders.$inferSelect
export type NewOrder = typeof orders.$inferInsert

export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  image_url: text('image_url'),
  second_image_url: text('second_image_url'),
  client_name: text('client_name'),
  link: text('link'),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
})

export type Project = typeof projects.$inferSelect
export type NewProject = typeof projects.$inferInsert

export const settings = pgTable('settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

export type Setting = typeof settings.$inferSelect
export type NewSetting = typeof settings.$inferInsert
