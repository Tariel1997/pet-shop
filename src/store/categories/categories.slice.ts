import { createSlice } from '@reduxjs/toolkit'

import type { Category } from '../../types/category.ts'
import {
  addCategory,
  editCategory,
  loadCategories,
  removeCategory,
} from './categories.thunks.ts'

interface CategoriesState {
  items: Category[]
  loading: boolean
  error: string | null
}

const initialState: CategoriesState = {
  items: [],
  loading: false,
  error: null,
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? 'Failed to load categories'
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.error = action.payload ?? 'Failed to add category'
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.error = action.payload ?? 'Failed to edit category'
      })
      .addCase(removeCategory.rejected, (state, action) => {
        state.error = action.payload ?? 'Failed to remove category'
      })
  },
})

export const { clearError } = categoriesSlice.actions
export default categoriesSlice.reducer
