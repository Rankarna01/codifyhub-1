import { createClient } from '@supabase/supabase-js'

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
const supabaseUrl = rawUrl || 'https://bdqybvjjbjhvsfakqzya.supabase.co'
const rawAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
const supabaseAnonKey = rawAnonKey || 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
