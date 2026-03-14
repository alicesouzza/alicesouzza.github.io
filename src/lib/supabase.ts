import { createClient } from '@supabase/supabase-js'
import { env } from './env'

export const createSupabaseClient = () => {
  return createClient(env.supabase.url, env.supabase.anonKey)
}

export const supabase = createSupabaseClient()
