'use client'

import { PLANS } from '@/services/stripeService'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

interface PricingCardProps {
  planName: string
  planId: string
  price: number
  features: Record<string, any>
  maxTickets: number
  onSelect: (planId: string) => void
  isCurrentPlan?: boolean
}

export function PricingCard({
  planName,
  planId,
  price,
  features,
  maxTickets,
  onSelect,
  isCurrentPlan = false,
}: PricingCardProps) {
  const isPro = planName === 'pro'

  return (
    <Card
      className={`relative ${isPro ? 'ring-2 ring-primary shadow-lg' : ''}`}
    >
      {isPro && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-bl-lg">
          Popular
        </div>
      )}

      <CardHeader>
        <CardTitle className="capitalize">{planName}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <span className="text-4xl font-bold text-foreground">
            {price === 0 ? 'Grátis' : `R$ ${price}`}
          </span>
          {price > 0 && <span className="text-muted-foreground">/mês</span>}
        </div>

        <ul className="space-y-3">
          <li className="flex items-center gap-2 text-sm text-foreground">
            <span className="text-primary">✓</span>
            {maxTickets === -1 ? 'Tickets ilimitados' : `Até ${maxTickets} tickets/mês`}
          </li>
          {features.users && (
            <li className="flex items-center gap-2 text-sm text-foreground">
              <span className="text-primary">✓</span>
              {features.users === -1 ? 'Usuários ilimitados' : `${features.users} usuário(s)`}
            </li>
          )}
          <li className="flex items-center gap-2 text-sm text-foreground">
            <span className="text-primary">✓</span>
            Suporte {features.support}
          </li>
        </ul>

        <Button
          onClick={() => onSelect(planId)}
          variant={isPro ? 'primary' : 'outline'}
          className="w-full"
          disabled={isCurrentPlan}
        >
          {isCurrentPlan ? 'Plano Atual' : 'Escolher Plano'}
        </Button>
      </CardContent>
    </Card>
  )
}

interface PricingTableProps {
  currentPlanId?: string
  onSelectPlan: (planId: string) => void
}

export function PricingTable({ currentPlanId, onSelectPlan }: PricingTableProps) {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-foreground">Planos Simples e Transparentes</h2>
        <p className="text-muted-foreground">
          Escolha o melhor plano para suas necessidades
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan) => (
          <PricingCard
            key={plan.id}
            planName={plan.name}
            planId={plan.id}
            price={plan.price}
            features={plan.features}
            maxTickets={plan.max_tickets}
            onSelect={onSelectPlan}
            isCurrentPlan={currentPlanId === plan.id}
          />
        ))}
      </div>
    </div>
  )
}
