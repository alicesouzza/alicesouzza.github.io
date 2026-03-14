# Stripe Integration Guide

Guia completo para integrar Stripe no projeto para processar pagamentos.

## Pré-requisitos

- Conta Stripe (https://stripe.com)
- API keys do Stripe
- Webhook configurado

## Passo 1: Obter Chaves do Stripe

### 1.1 Criar Conta Stripe

1. Acesse https://stripe.com
2. Clique em "Sign Up"
3. Complete o onboarding

### 1.2 Obter API Keys

1. Dashboard do Stripe > Developers > API Keys
2. Copie:
   - **Publishable Key**: `pk_live_...` (público)
   - **Secret Key**: `sk_live_...` (secreto)

3. Também obtenha:
   - **Webhook Signing Secret**: `whsec_...` (para webhooks)

## Passo 2: Configurar Variáveis de Ambiente

Adicione ao `.env.local`:

```env
# Stripe Public (pode ser exposto)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx

# Stripe Secret (nunca exponha!)
STRIPE_SECRET_KEY=sk_live_xxxxx

# Webhook Secret
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

## Passo 3: Criar Produtos e Preços

### 3.1 Via Dashboard Stripe

1. Products > Add Product
2. Preencha detalhes:
   - Nome: "SaaS Platform - Pro"
   - Descrição: "Plano Pro com suporte prioritário"
3. Adicione preço:
   - Preço: R$ 99.00 (ou valor em BRL)
   - Tipo: Recurring (assinatura)
   - Recorrência: Monthly

4. Salve o Price ID: `price_xxxxx`

### 3.2 Alternativa: Via API

```bash
curl https://api.stripe.com/v1/products \
  -u sk_live_xxxxx: \
  -d name="SaaS Platform - Pro" \
  -d type="service"

curl https://api.stripe.com/v1/prices \
  -u sk_live_xxxxx: \
  -d currency=brl \
  -d unit_amount=9900 \
  -d recurring[interval]=month \
  -d product=prod_xxxxx
```

## Passo 4: Configurar Webhooks

### 4.1 Endpoint URL

No Stripe Dashboard:

1. Developers > Webhooks > Add endpoint
2. URL: `https://seu-dominio.com/api/webhooks/stripe`
3. Selecione eventos:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Clique em "Add events"
5. Copie o Signing Secret: `whsec_xxxxx`

### 4.2 Testar Webhook Localmente

```bash
npm install -g stripe

stripe listen --forward-to localhost:3000/api/webhooks/stripe
stripe trigger payment_intent.succeeded
```

## Passo 5: Implementar Checkout

### 5.1 Frontend - Redirecionar para Checkout

```typescript
// Exemplo em um componente
async function handleCheckout(priceId: string) {
  const response = await fetch('/api/checkout', {
    method: 'POST',
    body: JSON.stringify({ priceId }),
  })

  const { sessionId } = await response.json()

  // Redirecionar para Stripe Checkout
  const stripe = window.Stripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  )
  await stripe.redirectToCheckout({ sessionId })
}
```

### 5.2 Backend - Criar Checkout Session

```typescript
// app/api/checkout/route.ts
export async function POST(request: NextRequest) {
  const { priceId, organizationId } = await request.json()

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: `${env.app.url}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.app.url}/canceled`,
    metadata: { organizationId },
  })

  return NextResponse.json({ sessionId: session.id })
}
```

## Passo 6: Processar Webhooks

O webhook handler em `/app/api/webhooks/stripe/route.ts` já está configurado.

Adicione lógica para:

1. **checkout.session.completed**:
   - Atualizar assinatura no banco
   - Salvar Stripe subscription ID
   - Enviar email de confirmação

2. **customer.subscription.updated**:
   - Atualizar status da assinatura
   - Aplicar mudanças de plano

3. **customer.subscription.deleted**:
   - Marcar assinatura como cancelada
   - Downgrade para plano free

## Passo 7: Implementar Customer Portal

Permita que usuários gerenciem assinaturas:

```typescript
// app/api/billing-portal/route.ts
export async function POST(request: NextRequest) {
  const { customerId } = await request.json()

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${env.app.url}/dashboard`,
  })

  return NextResponse.json({ url: portalSession.url })
}
```

## Passo 8: Testes

### Cartões de Teste

Stripe fornece números de cartão para testes:

- **Sucesso**: `4242 4242 4242 4242`
- **Falha**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`

Qualquer data futura e qualquer CVC.

### Testar Webhooks

```bash
stripe trigger checkout.session.completed
stripe trigger customer.subscription.updated
```

## Tratamento de Erros

### Autenticação Falhou
- Verifique API keys
- Confirme ambiente (test vs live)

### Webhook não recebido
- Teste endpoint em público (ngrok)
- Verifique logs do Stripe

### Cobrança Falhou
- Implementar retry logic
- Enviar notificações ao usuário

## Segurança

### Proteção de Dados

- ✅ Nunca commitar secret keys
- ✅ Usar variáveis de ambiente
- ✅ Validar signatures de webhooks
- ✅ Usar HTTPS em produção

### PCI Compliance

- Use Stripe Elements (não reimplementar campos)
- Stripe cuida da conformidade PCI
- Nunca armazene números de cartão

## Revenue Recognition

Stripe oferece:
- Relatórios de receita
- Análise de churn
- Dados de LTV (Lifetime Value)

Acesse em Dashboard > Revenue Recognition

## Documentação Oficial

- https://stripe.com/docs/payments/checkout
- https://stripe.com/docs/billing/subscriptions
- https://stripe.com/docs/webhooks
- https://stripe.com/docs/testing

## Suporte

- Email: support@stripe.com
- Chat: Live chat no dashboard
- Comunidade: https://support.stripe.com/forums
