import Stripe from 'stripe'
import type { ApiResponse, Subscription, SubscriptionPlan } from '@/types'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
})

export const stripeService = {
  async createCheckoutSession(
    organizationId: string,
    planId: string,
    successUrl: string,
    cancelUrl: string
  ): Promise<ApiResponse<{ sessionId: string }>> {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'brl',
              product_data: {
                name: `SaaS Platform - ${planId}`,
              },
              unit_amount: 9900, // R$ 99.00
            },
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          organization_id: organizationId,
          plan_id: planId,
        },
      })

      return {
        success: true,
        data: { sessionId: session.id },
        timestamp: new Date().toISOString(),
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'STRIPE_ERROR',
          message: error instanceof Error ? error.message : 'Erro Stripe',
        },
        timestamp: new Date().toISOString(),
      }
    }
  },

  async getCustomerSubscriptions(customerId: string): Promise<ApiResponse<Stripe.Subscription[]>> {
    try {
      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        limit: 10,
      })

      return {
        success: true,
        data: subscriptions.data,
        timestamp: new Date().toISOString(),
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'STRIPE_ERROR',
          message: error instanceof Error ? error.message : 'Erro Stripe',
        },
        timestamp: new Date().toISOString(),
      }
    }
  },

  async cancelSubscription(subscriptionId: string): Promise<ApiResponse<null>> {
    try {
      await stripe.subscriptions.del(subscriptionId)

      return {
        success: true,
        data: null,
        timestamp: new Date().toISOString(),
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'STRIPE_ERROR',
          message: error instanceof Error ? error.message : 'Erro Stripe',
        },
        timestamp: new Date().toISOString(),
      }
    }
  },

  async handleWebhook(event: Stripe.Event): Promise<ApiResponse<null>> {
    try {
      switch (event.type) {
        case 'checkout.session.completed':
          // Handle successful checkout
          console.log('Checkout completado:', event.data.object)
          break

        case 'customer.subscription.updated':
          // Handle subscription update
          console.log('Subscription atualizada:', event.data.object)
          break

        case 'customer.subscription.deleted':
          // Handle subscription cancellation
          console.log('Subscription cancelada:', event.data.object)
          break
      }

      return {
        success: true,
        data: null,
        timestamp: new Date().toISOString(),
      }
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'WEBHOOK_ERROR',
          message: error instanceof Error ? error.message : 'Erro ao processar webhook',
        },
        timestamp: new Date().toISOString(),
      }
    }
  },
}

// Plan definitions
export const PLANS: SubscriptionPlan[] = [
  {
    id: 'plan_free',
    name: 'free',
    price: 0,
    billing_period: 'monthly',
    features: {
      users: 1,
      support: 'email',
    },
    max_tickets: 10,
    max_storage: 1073741824, // 1GB
    created_at: new Date().toISOString(),
  },
  {
    id: 'plan_pro',
    name: 'pro',
    price: 99,
    billing_period: 'monthly',
    features: {
      users: 5,
      support: 'priority',
    },
    max_tickets: 100,
    max_storage: 53687091200, // 50GB
    created_at: new Date().toISOString(),
  },
  {
    id: 'plan_enterprise',
    name: 'enterprise',
    price: 0, // Custom pricing
    billing_period: 'monthly',
    features: {
      users: -1, // Unlimited
      support: 'dedicated',
    },
    max_tickets: -1, // Unlimited
    max_storage: 1099511627776, // 1TB
    created_at: new Date().toISOString(),
  },
]
