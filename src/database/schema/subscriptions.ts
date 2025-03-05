import {
  date,
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'
import { paymentMethods } from './payment-methods'

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text().notNull(),
  icon: text().notNull(),
  price: numeric().notNull(),
  startDate: date('start_date').notNull(),
  period: varchar({ enum: ['monthly', 'anual'] }).notNull(),
  plan: text().notNull(),
  paymentMethodId: integer('payment_method_id').references(
    () => paymentMethods.id
  ),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
