import type { EntityId } from './common.ts'

export interface AnimalCategory {
  id: EntityId
  animal_id: EntityId
  category_id: EntityId
}

export type AnimalCategoryFormData = Omit<AnimalCategory, 'id'>
