'use client'

import { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent } from '@/components/ui/Card'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: 'admin' | 'user' | 'support'
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const router = useRouter()
  const { user, loading, isAuthenticated } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-8">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              <p className="text-muted-foreground">Carregando...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isAuthenticated) {
    router.push('/login')
    return null
  }

  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8">
            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground mb-2">Acesso Negado</h2>
              <p className="text-muted-foreground mb-4">
                Você não tem permissão para acessar esta página.
              </p>
              <button
                onClick={() => router.push('/dashboard')}
                className="text-primary hover:underline"
              >
                Voltar ao Dashboard
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
