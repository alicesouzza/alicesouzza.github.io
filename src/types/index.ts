export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
  }
  timestamp: string
}

export interface User {
  id: string
  auth_id: string
  email: string
  full_name: string
  avatar_url?: string
  role: 'admin' | 'user' | 'support'
  organization_id: string
  created_at: string
  updated_at: string
}

export interface Organization {
  id: string
  name: string
  slug: string
  logo_url?: string
  owner_id: string
  plan_id: string
  max_users: number
  storage_limit: number
  created_at: string
  updated_at: string
}

export interface HelpDeskTicket {
  id: string
  organization_id: string
  user_id: string
  title: string
  description: string
  status: 'open' | 'in_progress' | 'closed'
  priority: 'low' | 'medium' | 'high'
  assigned_to?: string
  created_at: string
  updated_at: string
}

export interface SubscriptionPlan {
  id: string
  name: 'free' | 'pro' | 'enterprise'
  price: number
  billing_period: 'monthly' | 'annual'
  features: Record<string, any>
  max_tickets: number
  max_storage: number
  created_at: string
}

export interface Subscription {
  id: string
  organization_id: string
  plan_id: string
  stripe_subscription_id?: string
  status: 'active' | 'canceled' | 'past_due'
  current_period_start: string
  current_period_end: string
  created_at: string
}
