import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export const metadata = {
  title: 'Dashboard - SaaS Platform',
  description: 'Seu painel de controle',
}

export default function DashboardPage() {
  const stats = [
    { label: 'Tickets Ativos', value: '5', icon: '🎫' },
    { label: 'Quizzes Completos', value: '12', icon: '✅' },
    { label: 'Saldo Total', value: 'R$ 2.500,00', icon: '💰' },
    { label: 'Senhas Geradas', value: '24', icon: '🔐' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Bem-vindo de volta! Aqui está um resumo da sua atividade.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                </div>
                <div className="text-4xl">{stat.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b">
                <div>
                  <p className="font-medium text-foreground">Ticket #001 criado</p>
                  <p className="text-sm text-muted-foreground">Há 2 horas</p>
                </div>
                <span className="text-yellow-500">Aberto</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b">
                <div>
                  <p className="font-medium text-foreground">Quiz concluído</p>
                  <p className="text-sm text-muted-foreground">Há 4 horas</p>
                </div>
                <span className="text-green-500">✓</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Senha gerada</p>
                  <p className="text-sm text-muted-foreground">Ontem</p>
                </div>
                <span className="text-blue-500">✓</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dicas e Recursos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md border border-blue-200">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-300">Dica do dia</p>
                <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                  Use a seção de Help Desk para gerenciar todas as suas solicitações de suporte em um único lugar.
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md border border-green-200">
                <p className="text-sm font-medium text-green-900 dark:text-green-300">Novidade</p>
                <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                  Agora você pode integrar suas finanças com múltiplas contas.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
