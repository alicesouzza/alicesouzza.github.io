'use client'

import { useEffect, useState } from 'react'
import { helpDeskService } from '@/services/helpDeskService'
import { formatDate } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Alert } from '@/components/ui/Alert'
import type { HelpDeskTicket } from '@/types'

interface TicketListProps {
  organizationId: string
  refreshTrigger?: number
}

const priorityColors = {
  low: 'text-blue-600',
  medium: 'text-yellow-600',
  high: 'text-red-600',
}

const priorityLabels = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
}

const statusLabels = {
  open: 'Aberto',
  in_progress: 'Em Progresso',
  closed: 'Fechado',
}

const statusColors = {
  open: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-yellow-100 text-yellow-800',
  closed: 'bg-green-100 text-green-800',
}

export function TicketList({ organizationId, refreshTrigger = 0 }: TicketListProps) {
  const [tickets, setTickets] = useState<HelpDeskTicket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await helpDeskService.getTickets(organizationId)

        if (!response.success) {
          setError(response.error?.message || 'Erro ao carregar tickets')
          return
        }

        setTickets(response.data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [organizationId, refreshTrigger])

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return <Alert type="error">{error}</Alert>
  }

  if (tickets.length === 0) {
    return (
      <Card>
        <CardContent className="p-8">
          <p className="text-center text-muted-foreground">Nenhum ticket encontrado.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seus Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border border-border rounded-lg p-4 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{ticket.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{ticket.description}</p>
                  <div className="flex gap-2 mt-3">
                    <span
                      className={`text-xs px-2 py-1 rounded ${statusColors[ticket.status]}`}
                    >
                      {statusLabels[ticket.status]}
                    </span>
                    <span className={`text-xs px-2 py-1 font-medium ${priorityColors[ticket.priority]}`}>
                      Prioridade: {priorityLabels[ticket.priority]}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">
                    {formatDate(ticket.created_at)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
