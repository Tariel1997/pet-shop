import type { EntityId } from './common.ts'

export interface Animal {
  id: EntityId
  name: string
  priceUSD: number
  priceGEL: number
  description: string
  isPopular: boolean
  stock: number
}

export type AnimalFormData = Omit<Animal, 'id'>
