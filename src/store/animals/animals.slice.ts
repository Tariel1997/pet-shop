import { createSlice } from '@reduxjs/toolkit'

import type { Animal } from '../../types/animal.ts'
import {
  addAnimal,
  editAnimal,
  loadAnimals,
  removeAnimal,
} from './animals.thunks.ts'

interface AnimalsState {
  items: Animal[]
  loading: boolean
  error: string | null
}

const initialState: AnimalsState = {
  items: [],
  loading: false,
  error: null,
}

const animalsSlice = createSlice({
  name: 'animals',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAnimals.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadAnimals.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(loadAnimals.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? 'Failed to load animals'
      })
      .addCase(addAnimal.rejected, (state, action) => {
        state.error = action.payload ?? 'Failed to add animal'
      })
      .addCase(editAnimal.rejected, (state, action) => {
        state.error = action.payload ?? 'Failed to edit animal'
      })
      .addCase(removeAnimal.rejected, (state, action) => {
        state.error = action.payload ?? 'Failed to remove animal'
      })
  },
})

export const { clearError } = animalsSlice.actions
export default animalsSlice.reducer
