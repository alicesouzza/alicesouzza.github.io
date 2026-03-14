'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/authService'
import { useUserStore } from '@/store/userStore'
import type { User } from '@/types'

export function useAuth() {
  const router = useRouter()
  const { user, loading, setUser, setLoading } = useUserStore()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authService.getCurrentUser()
        
        if (response.success && response.data) {
          setUser(response.data as User)
        } else {
          setUser(null)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao verificar autenticação')
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [setUser, setLoading])

  const logout = async () => {
    try {
      await authService.logout()
      setUser(null)
      router.push('/login')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao sair')
    }
  }

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    logout,
  }
}
