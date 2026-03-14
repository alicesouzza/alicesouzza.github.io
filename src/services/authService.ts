import { supabase } from '@/lib/supabase'
import type { ApiResponse, User } from '@/types'

export const authService = {
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return {
          success: false,
          error: {
            code: error.status?.toString() || 'AUTH_ERROR',
            message: error.message,
          },
          timestamp: new Date().toISOString(),
        }
      }

      return {
        success: true,
        data: {
          user: {
            id: data.user?.id || '',
            auth_id: data.user?.id || '',
            email: data.user?.email || '',
            full_name: data.user?.user_metadata?.full_name || '',
            role: 'user',
            organization_id: '',
            created_at: data.user?.created_at || new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          token: data.session?.access_token || '',
        },
        timestamp: new Date().toISOString(),
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'UNKNOWN_ERROR',
          message: error instanceof Error ? error.message : 'Erro desconhecido',
        },
        timestamp: new Date().toISOString(),
      }
    }
  },

  async register(email: string, password: string, fullName: string): Promise<ApiResponse<{ user: User }>> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (error) {
        return {
          success: false,
          error: {
            code: error.status?.toString() || 'AUTH_ERROR',
            message: error.message,
          },
          timestamp: new Date().toISOString(),
        }
      }

      return {
        success: true,
        data: {
          user: {
            id: data.user?.id || '',
            auth_id: data.user?.id || '',
            email: data.user?.email || '',
            full_name: data.user?.user_metadata?.full_name || '',
            role: 'user',
            organization_id: '',
            created_at: data.user?.created_at || new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        },
        timestamp: new Date().toISOString(),
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'UNKNOWN_ERROR',
          message: error instanceof Error ? error.message : 'Erro desconhecido',
        },
        timestamp: new Date().toISOString(),
      }
    }
  },

  async logout(): Promise<ApiResponse<null>> {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        return {
          success: false,
          error: {
            code: error.status?.toString() || 'AUTH_ERROR',
            message: error.message,
          },
          timestamp: new Date().toISOString(),
        }
      }

      return {
        success: true,
        data: null,
        timestamp: new Date().toISOString(),
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'UNKNOWN_ERROR',
          message: error instanceof Error ? error.message : 'Erro desconhecido',
        },
        timestamp: new Date().toISOString(),
      }
    }
  },

  async getCurrentUser(): Promise<ApiResponse<User | null>> {
    try {
      const { data, error } = await supabase.auth.getUser()

      if (error || !data.user) {
        return {
          success: true,
          data: null,
          timestamp: new Date().toISOString(),
        }
      }

      return {
        success: true,
        data: {
          id: data.user.id,
          auth_id: data.user.id,
          email: data.user.email || '',
          full_name: data.user.user_metadata?.full_name || '',
          role: 'user',
          organization_id: '',
          created_at: data.user.created_at || new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'UNKNOWN_ERROR',
          message: error instanceof Error ? error.message : 'Erro desconhecido',
        },
        timestamp: new Date().toISOString(),
      }
    }
  },
}
