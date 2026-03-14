import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

export const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string(),
  fullName: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não conferem',
  path: ['confirmPassword'],
})

export const createTicketSchema = z.object({
  title: z.string().min(5, 'Título deve ter no mínimo 5 caracteres'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  priority: z.enum(['low', 'medium', 'high']),
})

export const updateProfileSchema = z.object({
  fullName: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  avatar_url: z.string().url().optional().or(z.literal('')),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type CreateTicketInput = z.infer<typeof createTicketSchema>
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
