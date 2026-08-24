import type { EntityId } from './common.ts'

export interface Category {
  id: EntityId
  title: string
  description: string
}

export type CategoryFormData = Omit<Category, 'id'>
