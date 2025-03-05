interface SubscriptionInterface {
  name: string
  icon: string
  price: number
  startDate: string
  period: 'monthly' | 'anual'
  plan: string
}

const period = ['monthly', 'anual'] as const

export { type SubscriptionInterface, period }
