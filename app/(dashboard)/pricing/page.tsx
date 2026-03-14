'use client'

import { useState } from 'react'
import { PricingTable } from '@/components/modules/billing/PricingTable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Alert } from '@/components/ui/Alert'

export default function PricingPage() {
  const [currentPlanId, setCurrentPlanId] = useState<string>('plan_free')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSelectPlan = async (planId: string) => {
    try {
      // Aqui você faria a chamada para criar a sessão de checkout do Stripe
      setMessage({
        type: 'success',
        text: `Redirecionando para o checkout do plano ${planId}...`,
      })

      // Simulando redirecionamento
      setTimeout(() => {
        setCurrentPlanId(planId)
        setMessage(null)
      }, 2000)
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Erro ao processar sua solicitação. Tente novamente.',
      })
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Planos de Assinatura</h1>
        <p className="text-muted-foreground">
          Escolha o melhor plano para seu negócio
        </p>
      </div>

      {message && (
        <Alert type={message.type}>
          {message.text}
        </Alert>
      )}

      <PricingTable
        currentPlanId={currentPlanId}
        onSelectPlan={handleSelectPlan}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <Card>
          <CardHeader>
            <CardTitle>Perguntas Frequentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground">Posso fazer upgrade?</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Sim, você pode fazer upgrade a qualquer momento. A mudança entrará em vigor imediatamente.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">E o reembolso?</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Oferecemos reembolso completo se não estiver satisfeito nos primeiros 14 dias.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Precisa de Mais?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Fale conosco sobre um plano Enterprise personalizado com suporte dedicado.
            </p>
            <a
              href="mailto:sales@saasplatform.com"
              className="text-primary hover:underline font-semibold"
            >
              Contatar Sales
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
