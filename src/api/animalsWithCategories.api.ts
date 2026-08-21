import { API_KEY, BASE_URL } from '../config.ts'
import type {
  AnimalCategory,
  AnimalCategoryFormData,
} from '../types/animalCategory.ts'
import type { EntityId } from '../types/common.ts'

const headers: HeadersInit = {
  'Content-Type': 'application/json',
  'x-bypass-token': API_KEY,
}

interface RawItem<T> {
  id: EntityId
  data: T
}

interface ListResponse<T> {
  data?: RawItem<T>[]
}

const parseErrorMessage = async (response: Response): Promise<string> => {
  try {
    const data = await response.json()

    if (Array.isArray(data.message)) return data.message.join(', ')

    return data.message || data.error || JSON.stringify(data)
  } catch {
    return `HTTP ${response.status}`
  }
}

const flattenItem = <T extends object>(item: RawItem<T>): T & { id: EntityId } => ({
  id: item.id,
  ...item.data,
})

const fetchAnimalsWithCategories = async (): Promise<AnimalCategory[]> => {
  const response = await fetch(`${BASE_URL}/animals_with_categories`, { headers })

  if (!response.ok) throw new Error(await parseErrorMessage(response))

  const result:
    ListResponse<AnimalCategoryFormData> | RawItem<AnimalCategoryFormData>[] =
    await response.json()

  const list =
    'data' in result && result.data
      ? result.data
      : (result as RawItem<AnimalCategoryFormData>[])

  return list.map(flattenItem) as AnimalCategory[]
}

const createAnimalWithCategory = async (body: AnimalCategoryFormData) => {
  const response = await fetch(`${BASE_URL}/animals_with_categories`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ data: [body] }),
  })

  if (!response.ok) throw new Error(await parseErrorMessage(response))

  return await response.json()
}

const deleteAnimalWithCategory = async (id: EntityId) => {
  const response = await fetch(`${BASE_URL}/animals_with_categories/${id}`, {
    method: 'DELETE',
    headers,
  })

  if (!response.ok) throw new Error(await parseErrorMessage(response))

  return { status: 'success' as const }
}

export {
  fetchAnimalsWithCategories,
  createAnimalWithCategory,
  deleteAnimalWithCategory,
}
