import { Navigate, Route, Routes } from 'react-router-dom'

import { AnimalsPage } from '../features/animals/AnimalsPage.tsx'
import { AnimalsWithCategoriesPage } from '../features/animalsWithCategories/AnimalsWithCategoriesPage.tsx'
import { CategoriesPage } from '../features/categories/CategoriesPage.tsx'

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/animals" replace />} />
    <Route path="/animals" element={<AnimalsPage />} />
    <Route path="/categories" element={<CategoriesPage />} />
    <Route path="/animals-with-categories" element={<AnimalsWithCategoriesPage />} />
    <Route path="*" element={<Navigate to="/animals" replace />} />
  </Routes>
)
