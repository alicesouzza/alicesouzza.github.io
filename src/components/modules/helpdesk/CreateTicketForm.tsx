'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createTicketSchema, type CreateTicketInput } from '@/lib/validations'
import { helpDeskService } from '@/services/helpDeskService'
import { Button } from '@/components/ui/Button'
import { Input, Textarea, Select } from '@/components/ui/Input'
import { Alert } from '@/components/ui/Alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface CreateTicketFormProps {
  organizationId: string
  userId: string
  onSuccess: () => void
}

export function CreateTicketForm({ organizationId, userId, onSuccess }: CreateTicketFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTicketInput>({
    resolver: zodResolver(createTicketSchema),
  })

  const onSubmit = async (data: CreateTicketInput) => {
    setError(null)
    setIsLoading(true)

    try {
      const response = await helpDeskService.createTicket(organizationId, userId, data)

      if (!response.success) {
        setError(response.error?.message || 'Erro ao criar ticket')
        return
      }

      reset()
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar Novo Ticket</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && <Alert type="error">{error}</Alert>}

          <Input
            label="Título"
            type="text"
            placeholder="Descreva brevemente seu problema"
            {...register('title')}
            error={errors.title?.message}
          />

          <Textarea
            label="Descrição"
            placeholder="Forneça detalhes completos sobre o problema"
            rows={5}
            {...register('description')}
            error={errors.description?.message}
          />

          <Select
            label="Prioridade"
            options={[
              { value: 'low', label: 'Baixa' },
              { value: 'medium', label: 'Média' },
              { value: 'high', label: 'Alta' },
            ]}
            {...register('priority')}
            error={errors.priority?.message}
          />

          <Button type="submit" isLoading={isLoading} className="w-full">
            Criar Ticket
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
