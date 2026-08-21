import { useEffect } from 'react'

import { Modal } from '../../components/ui/Modal.tsx'
import { CheckboxRow, FormWrapper } from '../../components/ui/styles/Form.styles.ts'
import {
  addAnimalToCategory,
  loadAnimalsWithCategories,
  removeAnimalFromCategory,
} from '../../store/animalsWithCategories/animalsWithCategories.thunks.ts'
import { loadCategories } from '../../store/categories/categories.thunks.ts'
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts'
import type { Animal } from '../../types/animal.ts'

interface AnimalCategoriesModalProps {
  animal: Animal
  onClose: () => void
}

export const AnimalCategoriesModal = ({
  animal,
  onClose,
}: AnimalCategoriesModalProps) => {
  const dispatch = useAppDispatch()
  const categories = useAppSelector((state) => state.categories.items)
  const links = useAppSelector((state) => state.animalsWithCategories.items)

  useEffect(() => {
    dispatch(loadCategories())
    dispatch(loadAnimalsWithCategories())
  }, [dispatch])

  const linksForAnimal = links.filter((link) => link.animal_id === animal.id)

  const handleToggle = (categoryId: string, checked: boolean) => {
    if (checked) {
      dispatch(
        addAnimalToCategory({ animal_id: animal.id, category_id: categoryId }),
      )
      return
    }

    const existingLink = linksForAnimal.find(
      (link) => link.category_id === categoryId,
    )
    if (existingLink) {
      dispatch(removeAnimalFromCategory(existingLink.id))
    }
  }

  return (
    <Modal title={`${animal.name} - კატეგორიები`} onClose={onClose}>
      <FormWrapper as="div">
        {categories.length === 0 && <p>კატეგორიები ჯერ არ არის შექმნილი</p>}

        {categories.map((category) => {
          const isChecked = linksForAnimal.some(
            (link) => link.category_id === category.id,
          )

          return (
            <CheckboxRow key={category.id}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(event) => handleToggle(category.id, event.target.checked)}
              />
              {category.title}
            </CheckboxRow>
          )
        })}
      </FormWrapper>
    </Modal>
  )
}
