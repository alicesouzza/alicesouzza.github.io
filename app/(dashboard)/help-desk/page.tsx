'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { CreateTicketForm } from '@/components/modules/helpdesk/CreateTicketForm'
import { TicketList } from '@/components/modules/helpdesk/TicketList'

export default function HelpDeskPage() {
  const { user, isAuthenticated, loading } = useAuth()
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  if (loading || !isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  const handleTicketCreated = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <ProtectedRoute>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Help Desk</h1>
          <p className="text-muted-foreground">
            Gerencie seus tickets de suporte e acompanhe o progresso
          </p>
        </div>

        {user && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <CreateTicketForm
                organizationId={user.organization_id}
                userId={user.id}
                onSuccess={handleTicketCreated}
              />
            </div>
            <div className="lg:col-span-2">
              <TicketList organizationId={user.organization_id} refreshTrigger={refreshTrigger} />
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  )
}
