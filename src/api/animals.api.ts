import { API_KEY, BASE_URL } from '../config.ts'
import type { Animal, AnimalFormData } from '../types/animal.ts'
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

const fetchAnimals = async (): Promise<Animal[]> => {
  const response = await fetch(`${BASE_URL}/animals`, { headers })

  if (!response.ok) throw new Error(await parseErrorMessage(response))

  const result: ListResponse<AnimalFormData> | RawItem<AnimalFormData>[] =
    await response.json()

  const list =
    'data' in result && result.data
      ? result.data
      : (result as RawItem<AnimalFormData>[])

  return list.map(flattenItem) as Animal[]
}

const createAnimal = async (body: AnimalFormData) => {
  const response = await fetch(`${BASE_URL}/animals`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ data: [body] }),
  })

  if (!response.ok) throw new Error(await parseErrorMessage(response))

  return await response.json()
}

const updateAnimal = async (id: EntityId, body: AnimalFormData) => {
  const response = await fetch(`${BASE_URL}/animals/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ data: body }),
  })

  if (!response.ok) throw new Error(await parseErrorMessage(response))

  return await response.json()
}

const deleteAnimal = async (id: EntityId) => {
  const response = await fetch(`${BASE_URL}/animals/${id}`, {
    method: 'DELETE',
    headers,
  })

  if (!response.ok) throw new Error(await parseErrorMessage(response))

  return { status: 'success' as const }
}

export { fetchAnimals, createAnimal, updateAnimal, deleteAnimal }
