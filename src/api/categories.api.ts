import { API_KEY, BASE_URL } from '../config.ts'
import type { Category, CategoryFormData } from '../types/category.ts'
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

const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${BASE_URL}/categories`, { headers })

  if (!response.ok) throw new Error(await parseErrorMessage(response))

  const result: ListResponse<CategoryFormData> | RawItem<CategoryFormData>[] =
    await response.json()

  const list =
    'data' in result && result.data
      ? result.data
      : (result as RawItem<CategoryFormData>[])

  return list.map(flattenItem) as Category[]
}

const createCategory = async (body: CategoryFormData) => {
  const response = await fetch(`${BASE_URL}/categories`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ data: [body] }),
  })

  if (!response.ok) throw new Error(await parseErrorMessage(response))

  return await response.json()
}

const updateCategory = async (id: EntityId, body: CategoryFormData) => {
  const response = await fetch(`${BASE_URL}/categories/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ data: body }),
  })

  if (!response.ok) throw new Error(await parseErrorMessage(response))

  return await response.json()
}

const deleteCategory = async (id: EntityId) => {
  const response = await fetch(`${BASE_URL}/categories/${id}`, {
    method: 'DELETE',
    headers,
  })

  if (!response.ok) throw new Error(await parseErrorMessage(response))

  return { status: 'success' as const }
}

export { fetchCategories, createCategory, updateCategory, deleteCategory }
