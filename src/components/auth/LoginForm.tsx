'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginInput } from '@/lib/validations'
import { authService } from '@/services/authService'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Alert } from '@/components/ui/Alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginInput) => {
    setError(null)
    setIsLoading(true)

    try {
      const response = await authService.login(data.email, data.password)

      if (!response.success) {
        setError(response.error?.message || 'Erro ao fazer login')
        return
      }

      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Entrar na SaaS Platform</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && <Alert type="error">{error}</Alert>}

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

          <Button type="submit" isLoading={isLoading} className="w-full">
            Entrar
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Não tem conta?{' '}
            <a href="/register" className="text-primary hover:underline">
              Cadastre-se
            </a>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
