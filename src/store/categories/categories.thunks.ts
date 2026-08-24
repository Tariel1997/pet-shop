import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from '../../api/categories.api.ts'
import type { Category, CategoryFormData } from '../../types/category.ts'
import type { EntityId } from '../../types/common.ts'

interface EditCategoryPayload {
  id: EntityId
  categoryData: CategoryFormData
}

export const loadCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>('categories/loadCategories', async (_, { rejectWithValue }) => {
  try {
    return await fetchCategories()
  } catch (err) {
    return rejectWithValue((err as Error).message)
  }
})

export const addCategory = createAsyncThunk<
  void,
  CategoryFormData,
  { rejectValue: string }
>('categories/addCategory', async (categoryData, { dispatch, rejectWithValue }) => {
  try {
    await createCategory(categoryData)
    await dispatch(loadCategories())
  } catch (err) {
    return rejectWithValue((err as Error).message)
  }
})

export const editCategory = createAsyncThunk<
  void,
  EditCategoryPayload,
  { rejectValue: string }
>(
  'categories/editCategory',
  async ({ id, categoryData }, { dispatch, rejectWithValue }) => {
    try {
      await updateCategory(id, categoryData)
      await dispatch(loadCategories())
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const removeCategory = createAsyncThunk<
  void,
  EntityId,
  { rejectValue: string }
>('categories/removeCategory', async (id, { dispatch, rejectWithValue }) => {
  try {
    await deleteCategory(id)
    await dispatch(loadCategories())
  } catch (err) {
    return rejectWithValue((err as Error).message)
  }
})
