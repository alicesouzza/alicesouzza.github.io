'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterInput } from '@/lib/validations'
import { authService } from '@/services/authService'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Alert } from '@/components/ui/Alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export function RegisterForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterInput) => {
    setError(null)
    setIsLoading(true)

    try {
      const response = await authService.register(data.email, data.password, data.fullName)

      if (!response.success) {
        setError(response.error?.message || 'Erro ao cadastrar')
        return
      }

      router.push('/login?registered=true')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Cadastro na SaaS Platform</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && <Alert type="error">{error}</Alert>}

          <Input
            label="Nome Completo"
            type="text"
            placeholder="Seu nome"
            {...register('fullName')}
            error={errors.fullName?.message}
          />

          <Input
            label="Email"
            type="email"
            placeholder="seu@email.com"
            {...register('email')}
            error={errors.email?.message}
          />

          <Input
            label="Senha"
            type="password"
            placeholder="••••••"
            {...register('password')}
            error={errors.password?.message}
          />

          <Input
            label="Confirmar Senha"
            type="password"
            placeholder="••••••"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />

          <Button type="submit" isLoading={isLoading} className="w-full">
            Cadastrar
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Já tem conta?{' '}
            <a href="/login" className="text-primary hover:underline">
              Faça login
            </a>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
