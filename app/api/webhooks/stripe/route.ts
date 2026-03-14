import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

export async function POST(request: NextRequest) {
  try {
    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET não configurado')
      return NextResponse.json(
        { error: 'Webhook not configured' },
        { status: 500 }
      )
    }

    const body = await request.text()
    const signature = request.headers.get('stripe-signature') || ''

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Erro ao verificar webhook signature:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        // Update subscription in database
        console.log('Checkout session completed:', {
          sessionId: session.id,
          customerId: session.customer,
          metadata: session.metadata,
        })

        // Aqui você faria:
        // 1. Buscar a organização pelo metadata
        // 2. Atualizar status da assinatura
        // 3. Salvar Stripe subscription ID
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription

        console.log('Subscription updated:', {
          subscriptionId: subscription.id,
          status: subscription.status,
        })

        // Update subscription status in database
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription

        console.log('Subscription deleted:', {
          subscriptionId: subscription.id,
        })

        // Mark subscription as canceled in database
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice

        console.log('Invoice payment succeeded:', {
          invoiceId: invoice.id,
          amount: invoice.amount_paid,
        })

        // Send payment confirmation email
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice

        console.log('Invoice payment failed:', {
          invoiceId: invoice.id,
        })

        // Send payment failure notification
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
