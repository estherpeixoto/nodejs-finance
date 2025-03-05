import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { flag } from '../database/types/payment-method'
import { period } from '../database/types/subscription'
import { createSubscription } from '../models/subscription-model'

export const createSubscriptionRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        operationId: 'createSubscription',
        summary: "Create a subscription and it's payment method",
        description: [
          "Payment method creation: this endpoint tries to retrieve the payment method id by it's name, flag and last four digits (as a composite primary key). It is a find or create logic.",
          'Subscription creation: after the payment method id is retrieved, the subscription can be easily inserted into the database.',
        ].join('<br><br>'),
        tags: ['subscription'],
        body: z.object({
          name: z.string(),
          icon: z.string(),
          price: z.number().positive(),
          startDate: z.string().date(),
          period: z.enum(period),
          plan: z.string(),
          paymentMethod: z.object({
            name: z.string(),
            flag: z.enum(flag),
            lastFourDigits: z.string(),
          }),
        }),
      },
    },
    async (request, reply) => {
      const params = request.body

      const { subscriptionId } = await createSubscription(params)

      return reply.status(201).send({
        subscriptionId,
      })
    }
  )
}
