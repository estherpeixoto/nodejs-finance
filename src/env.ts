import { z } from 'zod'

const envSchema = z.object({
  BACKEND_PORT: z.coerce.number().default(3333),
  FRONTEND_URL: z.string().url(),
  POSTGRES_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
