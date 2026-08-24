import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  createAnimal,
  deleteAnimal,
  fetchAnimals,
  updateAnimal,
} from '../../api/animals.api.ts'
import type { Animal, AnimalFormData } from '../../types/animal.ts'
import type { EntityId } from '../../types/common.ts'

interface EditAnimalPayload {
  id: EntityId
  animalData: AnimalFormData
}

export const loadAnimals = createAsyncThunk<Animal[], void, { rejectValue: string }>(
  'animals/loadAnimals',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAnimals()
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const addAnimal = createAsyncThunk<
  void,
  AnimalFormData,
  { rejectValue: string }
>('animals/addAnimal', async (animalData, { dispatch, rejectWithValue }) => {
  try {
    await createAnimal(animalData)
    await dispatch(loadAnimals())
  } catch (err) {
    return rejectWithValue((err as Error).message)
  }
})

export const editAnimal = createAsyncThunk<
  void,
  EditAnimalPayload,
  { rejectValue: string }
>(
  'animals/editAnimal',
  async ({ id, animalData }, { dispatch, rejectWithValue }) => {
    try {
      await updateAnimal(id, animalData)
      await dispatch(loadAnimals())
    } catch (err) {
      return rejectWithValue((err as Error).message)
    }
  },
)

export const removeAnimal = createAsyncThunk<
  void,
  EntityId,
  { rejectValue: string }
>('animals/removeAnimal', async (id, { dispatch, rejectWithValue }) => {
  try {
    await deleteAnimal(id)
    await dispatch(loadAnimals())
  } catch (err) {
    return rejectWithValue((err as Error).message)
  }
})
