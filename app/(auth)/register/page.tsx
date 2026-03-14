import { RegisterForm } from '@/components/auth/RegisterForm'

export const metadata = {
  title: 'Cadastro - SaaS Platform',
  description: 'Crie sua conta na SaaS Platform',
}

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">SaaS Platform</h1>
          <p className="text-muted-foreground">Comece sua jornada conosco</p>
        </div>
        <RegisterForm />
      </div>
    </main>
  )
}
