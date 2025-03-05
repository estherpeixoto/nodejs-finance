import { db } from '../database/client'
import { subscriptions } from '../database/schema/subscriptions'
import type { PaymentMethodInterface } from '../database/types/payment-method'
import type { SubscriptionInterface } from '../database/types/subscription'
import { createPaymentMethod } from './payment-method-model'

interface CreateSubscriptionParams extends SubscriptionInterface {
  paymentMethod: PaymentMethodInterface
}

export const createSubscription = async (params: CreateSubscriptionParams) => {
  const { paymentMethodId } = await createPaymentMethod({
    name: params.paymentMethod.name,
    flag: params.paymentMethod.flag,
    lastFourDigits: params.paymentMethod.lastFourDigits,
  })

  const result = await db
    .insert(subscriptions)
    .values({
      ...params,
      price: params.price.toString(),
      paymentMethodId,
    })
    .returning()

  const subscription = result[0]

  return {
    subscriptionId: subscription.id,
  }
}
