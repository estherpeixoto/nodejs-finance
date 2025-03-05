import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const paymentMethods = pgTable('payment_methods', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  flag: varchar({ enum: ['mastercard', 'visa', 'elo'] }).notNull(),
  lastFourDigits: varchar('last_four_digits', { length: 4 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
