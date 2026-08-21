import { useEffect, useMemo, useState } from 'react'

import { ConfirmDialog } from '../../components/ui/ConfirmDialog.tsx'
import { ErrorBanner } from '../../components/ui/ErrorBanner.tsx'
import { Modal } from '../../components/ui/Modal.tsx'
import {
  IconTextButton,
  PrimaryButton,
} from '../../components/ui/styles/Button.styles.ts'
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
import { clearError } from '../../store/animals/animals.slice.ts'
import {
  addAnimal,
  editAnimal,
  loadAnimals,
  removeAnimal,
} from '../../store/animals/animals.thunks.ts'
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts'
import type { Animal, AnimalFormData } from '../../types/animal.ts'
import { AnimalCategoriesModal } from './AnimalCategoriesModal.tsx'
import { AnimalForm } from './AnimalForm.tsx'
import { Badge, SearchInput, ToolbarRow } from './AnimalsPage.styles.ts'

type ModalState =
  | { mode: 'closed' }
  | { mode: 'create' }
  | { mode: 'edit'; animal: Animal }
  | { mode: 'delete'; animal: Animal }
  | { mode: 'categories'; animal: Animal }

export const AnimalsPage = () => {
  const dispatch = useAppDispatch()
  const { items, loading, error } = useAppSelector((state) => state.animals)
  const [modalState, setModalState] = useState<ModalState>({ mode: 'closed' })
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    dispatch(loadAnimals())
  }, [dispatch])

  const filteredItems = useMemo(
    () =>
      items.filter((animal) =>
        animal.name.toLowerCase().includes(searchTerm.trim().toLowerCase()),
      ),
    [items, searchTerm],
  )

  const handleCreate = async (data: AnimalFormData) => {
    setSubmitting(true)
    await dispatch(addAnimal(data))
    setSubmitting(false)
    setModalState({ mode: 'closed' })
  }

  const handleEdit = async (id: string, data: AnimalFormData) => {
    setSubmitting(true)
    await dispatch(editAnimal({ id, animalData: data }))
    setSubmitting(false)
    setModalState({ mode: 'closed' })
  }

  const handleDelete = async (id: string) => {
    setSubmitting(true)
    await dispatch(removeAnimal(id))
    setSubmitting(false)
    setModalState({ mode: 'closed' })
  }

  return (
    <div>
      <PageHeader>
        <PageTitle>Animals</PageTitle>
        <PrimaryButton onClick={() => setModalState({ mode: 'create' })}>
          + ცხოველის დამატება
        </PrimaryButton>
      </PageHeader>

      {error && (
        <ErrorBanner message={error} onDismiss={() => dispatch(clearError())} />
      )}

      <ToolbarRow>
        <SearchInput
          placeholder="Search Bar"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </ToolbarRow>

      <TableWrapper>
        <Table>
          <Thead>
            <tr>
              <Th>User</Th>
              <Th>Price (USD)</Th>
              <Th>Price (GEL)</Th>
              <Th>Stock</Th>
              <Th>Activity</Th>
              <Th />
            </tr>
          </Thead>
          <tbody>
            {filteredItems.map((animal) => (
              <Tr key={animal.id}>
                <Td>{animal.name}</Td>
                <Td>${animal.priceUSD}</Td>
                <Td>{animal.priceGEL} ₾</Td>
                <Td>{animal.stock}</Td>
                <Td>
                  <Badge $popular={animal.isPopular}>
                    {animal.isPopular ? 'Popular' : 'Regular'}
                  </Badge>
                </Td>
                <ActionsCell>
                  <IconTextButton
                    onClick={() => setModalState({ mode: 'categories', animal })}
                  >
                    კატეგორიები
                  </IconTextButton>
                  <IconTextButton
                    onClick={() => setModalState({ mode: 'edit', animal })}
                  >
                    რედაქტირება
                  </IconTextButton>
                  <IconTextButton
                    onClick={() => setModalState({ mode: 'delete', animal })}
                  >
                    წაშლა
                  </IconTextButton>
                </ActionsCell>
              </Tr>
            ))}
          </tbody>
        </Table>

        {!loading && filteredItems.length === 0 && (
          <EmptyState>ცხოველები არ მოიძებნა</EmptyState>
        )}
      </TableWrapper>

      {modalState.mode === 'create' && (
        <Modal
          title="ახალი ცხოველი"
          onClose={() => setModalState({ mode: 'closed' })}
        >
          <AnimalForm
            submitting={submitting}
            onSubmit={handleCreate}
            onCancel={() => setModalState({ mode: 'closed' })}
          />
        </Modal>
      )}

      {modalState.mode === 'edit' && (
        <Modal
          title="ცხოველის რედაქტირება"
          onClose={() => setModalState({ mode: 'closed' })}
        >
          <AnimalForm
            initialData={modalState.animal}
            submitting={submitting}
            onSubmit={(data) => handleEdit(modalState.animal.id, data)}
            onCancel={() => setModalState({ mode: 'closed' })}
          />
        </Modal>
      )}

      {modalState.mode === 'delete' && (
        <ConfirmDialog
          title="ცხოველის წაშლა"
          message={`დარწმუნებული ხართ, რომ გსურთ წაშალოთ "${modalState.animal.name}"?`}
          onConfirm={() => handleDelete(modalState.animal.id)}
          onCancel={() => setModalState({ mode: 'closed' })}
        />
      )}

      {modalState.mode === 'categories' && (
        <AnimalCategoriesModal
          animal={modalState.animal}
          onClose={() => setModalState({ mode: 'closed' })}
        />
      )}
    </div>
  )
}
