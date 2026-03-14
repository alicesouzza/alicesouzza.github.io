export const env = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  },
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
    secretKey: process.env.STRIPE_SECRET_KEY || '',
  },
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    environment: process.env.NODE_ENV || 'development',
  },
}

export const validateEnv = () => {
  const missing: string[] = []

  if (!env.supabase.url) missing.push('NEXT_PUBLIC_SUPABASE_URL')
  if (!env.supabase.anonKey) missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY')

  if (missing.length > 0) {
    console.warn(`Missing environment variables: ${missing.join(', ')}`)
  }
}
