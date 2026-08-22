import { Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import { ErrorBanner } from '../../components/ui/ErrorBanner.tsx'
import { Modal } from '../../components/ui/Modal.tsx'
import {
  IconButton,
  PrimaryButton,
  SecondaryButton,
} from '../../components/ui/styles/Button.styles.ts'
import {
  ErrorText,
  FieldGroup,
  FormActions,
  FormWrapper,
  Label,
} from '../../components/ui/styles/Form.styles.ts'
import {
  ActionsCell,
  EmptyState,
  PageHeader,
  PageTitle,
  Table,
  TableWrapper,
  Td,
  Th,
  Thead,
  Tr,
} from '../../components/ui/styles/Table.styles.ts'
import { loadAnimals } from '../../store/animals/animals.thunks.ts'
import { clearError } from '../../store/animalsWithCategories/animalsWithCategories.slice.ts'
import {
  addAnimalToCategory,
  loadAnimalsWithCategories,
  removeAnimalFromCategory,
} from '../../store/animalsWithCategories/animalsWithCategories.thunks.ts'
import { loadCategories } from '../../store/categories/categories.thunks.ts'
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts'

export const AnimalsWithCategoriesPage = () => {
  const dispatch = useAppDispatch()
  const animals = useAppSelector((state) => state.animals.items)
  const categories = useAppSelector((state) => state.categories.items)
  const links = useAppSelector((state) => state.animalsWithCategories.items)
  const loading = useAppSelector((state) => state.animalsWithCategories.loading)
  const error = useAppSelector((state) => state.animalsWithCategories.error)

  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false)
  const [selectedAnimalId, setSelectedAnimalId] = useState<string>('')
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')
  const [validationError, setValidationError] = useState<string | null>(null)

  useEffect(() => {
    dispatch(loadAnimals())
    dispatch(loadCategories())
    dispatch(loadAnimalsWithCategories())
  }, [dispatch])

  const getAnimalName = (animalId: string): string =>
    animals.find((animal) => animal.id === animalId)?.name ?? 'Unknown animal'

  const getCategoryTitle = (categoryId: string): string =>
    categories.find((category) => category.id === categoryId)?.title ??
    'Unknown category'

  const handleCreate = () => {
    if (!selectedAnimalId || !selectedCategoryId) {
      setValidationError('Please select an animal and a category')
      return
    }

    setValidationError(null)
    dispatch(
      addAnimalToCategory({
        animal_id: selectedAnimalId,
        category_id: selectedCategoryId,
      }),
    )
    setSelectedAnimalId('')
    setSelectedCategoryId('')
    setIsCreateOpen(false)
  }

  return (
    <div>
      <PageHeader>
        <PageTitle>Animals With Categories</PageTitle>
        <PrimaryButton onClick={() => setIsCreateOpen(true)}>
          <Plus size={16} />
          Add Link
        </PrimaryButton>
      </PageHeader>

      {error && (
        <ErrorBanner message={error} onDismiss={() => dispatch(clearError())} />
      )}

      <TableWrapper>
        <Table>
          <Thead>
            <tr>
              <Th>Animal</Th>
              <Th>Category</Th>
              <Th />
            </tr>
          </Thead>
          <tbody>
            {links.map((link) => (
              <Tr key={link.id}>
                <Td>{getAnimalName(link.animal_id)}</Td>
                <Td>{getCategoryTitle(link.category_id)}</Td>
                <ActionsCell>
                  <IconButton
                    title="Remove link"
                    onClick={() => dispatch(removeAnimalFromCategory(link.id))}
                  >
                    <Trash2 size={16} />
                  </IconButton>
                </ActionsCell>
              </Tr>
            ))}
          </tbody>
        </Table>

        {!loading && links.length === 0 && <EmptyState>No links found</EmptyState>}
      </TableWrapper>

      {isCreateOpen && (
        <Modal title="Add Animal To Category" onClose={() => setIsCreateOpen(false)}>
          <FormWrapper as="div">
            <FieldGroup>
              <Label htmlFor="animal-select">Animal</Label>
              <select
                id="animal-select"
                value={selectedAnimalId}
                onChange={(event) => setSelectedAnimalId(event.target.value)}
              >
                <option value="">-- Select --</option>
                {animals.map((animal) => (
                  <option key={animal.id} value={animal.id}>
                    {animal.name}
                  </option>
                ))}
              </select>
            </FieldGroup>

            <FieldGroup>
              <Label htmlFor="category-select">Category</Label>
              <select
                id="category-select"
                value={selectedCategoryId}
                onChange={(event) => setSelectedCategoryId(event.target.value)}
              >
                <option value="">-- Select --</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </FieldGroup>

            {validationError && <ErrorText>{validationError}</ErrorText>}

            <FormActions>
              <SecondaryButton type="button" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </SecondaryButton>
              <PrimaryButton type="button" onClick={handleCreate}>
                Add
              </PrimaryButton>
            </FormActions>
          </FormWrapper>
        </Modal>
      )}
    </div>
  )
}
