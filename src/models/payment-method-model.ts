import { and, eq } from 'drizzle-orm'
import { db } from '../database/client'
import { paymentMethods } from '../database/schema/payment-methods'
import type { PaymentMethodInterface } from '../database/types/payment-method'

export const createPaymentMethod = async ({
  name,
  flag,
  lastFourDigits,
}: PaymentMethodInterface) => {
  const oldPaymentMethod = await db
    .select()
    .from(paymentMethods)
    .where(
      and(
        eq(paymentMethods.name, name),
        eq(paymentMethods.flag, flag),
        eq(paymentMethods.lastFourDigits, lastFourDigits)
      )
    )

  if (oldPaymentMethod.length > 0) {
    return { paymentMethodId: oldPaymentMethod[0].id }
  }

  const result = await db
    .insert(paymentMethods)
    .values({ name, flag, lastFourDigits })
    .returning()

  const newPaymentMethod = result[0]

  return { paymentMethodId: newPaymentMethod.id }
}
