import type { Config } from 'drizzle-kit'
import { env } from './src/env'

export default {
  schema: './src/database/schema/*',
  out: './src/database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
} satisfies Config
