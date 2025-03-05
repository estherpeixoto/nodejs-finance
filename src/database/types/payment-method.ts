interface PaymentMethodInterface {
  name: string
  flag: 'mastercard' | 'visa' | 'elo'
  lastFourDigits: string
}

const flag = ['mastercard', 'visa', 'elo'] as const

export { type PaymentMethodInterface, flag }
