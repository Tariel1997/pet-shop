import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  createAnimalWithCategory,
  deleteAnimalWithCategory,
  fetchAnimalsWithCategories,
} from '../../api/animalsWithCategories.api.ts'
import type {
  AnimalCategory,
  AnimalCategoryFormData,
} from '../../types/animalCategory.ts'
import type { EntityId } from '../../types/common.ts'

export const loadAnimalsWithCategories = createAsyncThunk<
  AnimalCategory[],
  void,
  { rejectValue: string }
>(
  'animalsWithCategories/loadAnimalsWithCategories',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAnimalsWithCategories()
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const addAnimalToCategory = createAsyncThunk<
  void,
  AnimalCategoryFormData,
  { rejectValue: string }
>(
  'animalsWithCategories/addAnimalToCategory',
  async (linkData, { dispatch, rejectWithValue }) => {
    try {
      await createAnimalWithCategory(linkData)
      await dispatch(loadAnimalsWithCategories())
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const removeAnimalFromCategory = createAsyncThunk<
  void,
  EntityId,
  { rejectValue: string }
>(
  'animalsWithCategories/removeAnimalFromCategory',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await deleteAnimalWithCategory(id)
      await dispatch(loadAnimalsWithCategories())
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)
