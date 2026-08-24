import { configureStore } from '@reduxjs/toolkit'

import animalsReducer from './animals/animals.slice.ts'
import animalsWithCategoriesReducer from './animalsWithCategories/animalsWithCategories.slice.ts'
import categoriesReducer from './categories/categories.slice.ts'

export const store = configureStore({
  reducer: {
    animals: animalsReducer,
    categories: categoriesReducer,
    animalsWithCategories: animalsWithCategoriesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
