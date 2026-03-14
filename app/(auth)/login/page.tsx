import { LoginForm } from '@/components/auth/LoginForm'

export const metadata = {
  title: 'Entrar - SaaS Platform',
  description: 'Faça login em sua conta',
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">SaaS Platform</h1>
          <p className="text-muted-foreground">Gerenciar seus negócios nunca foi tão fácil</p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
