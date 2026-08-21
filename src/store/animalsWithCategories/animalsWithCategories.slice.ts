import { createSlice } from '@reduxjs/toolkit'

import type { AnimalCategory } from '../../types/animalCategory.ts'
import {
  addAnimalToCategory,
  loadAnimalsWithCategories,
  removeAnimalFromCategory,
} from './animalsWithCategories.thunks.ts'

interface AnimalsWithCategoriesState {
  items: AnimalCategory[]
  loading: boolean
  error: string | null
}

const initialState: AnimalsWithCategoriesState = {
  items: [],
  loading: false,
  error: null,
}

const animalsWithCategoriesSlice = createSlice({
  name: 'animalsWithCategories',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAnimalsWithCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadAnimalsWithCategories.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(loadAnimalsWithCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? 'Failed to load animals with categories'
      })
      .addCase(addAnimalToCategory.rejected, (state, action) => {
        state.error = action.payload ?? 'Failed to add animal to category'
      })
      .addCase(removeAnimalFromCategory.rejected, (state, action) => {
        state.error = action.payload ?? 'Failed to remove animal from category'
      })
  },
})

export const { clearError } = animalsWithCategoriesSlice.actions
export default animalsWithCategoriesSlice.reducer
