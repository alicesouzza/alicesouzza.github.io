export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="text-center space-y-6 max-w-2xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-slate-900 dark:text-white">
          Bem-vindo à SaaS Platform
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300">
          Plataforma escalável com múltiplos módulos para gerenciar seu negócio
        </p>
        <div className="flex gap-4 justify-center pt-8">
          <a
            href="/login"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Entrar
          </a>
          <a
            href="/register"
            className="px-8 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/80 transition-colors"
          >
            Cadastrar
          </a>
        </div>
      </div>
    </main>
  )
}
