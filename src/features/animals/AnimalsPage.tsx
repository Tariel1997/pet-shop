import { PawPrint, Pencil, Plus, Tags, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import { ConfirmDialog } from '../../components/ui/ConfirmDialog.tsx'
import { ErrorBanner } from '../../components/ui/ErrorBanner.tsx'
import { Modal } from '../../components/ui/Modal.tsx'
import {
  IconButton,
  PrimaryButton,
} from '../../components/ui/styles/Button.styles.ts'
import {
  ActionsCell,
  Avatar,
  AvatarPlaceholder,
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
          <Plus size={16} />
          Add Animal
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
              <Th />
              <Th>Name</Th>
              <Th>Price (USD)</Th>
              <Th>Price (GEL)</Th>
              <Th>Description</Th>
              <Th>Popular</Th>
              <Th>Stock</Th>
              <Th />
            </tr>
          </Thead>
          <tbody>
            {filteredItems.map((animal) => (
              <Tr key={animal.id}>
                <Td>
                  {animal.imageUrl ? (
                    <Avatar src={animal.imageUrl} alt={animal.name} />
                  ) : (
                    <AvatarPlaceholder>
                      <PawPrint size={18} />
                    </AvatarPlaceholder>
                  )}
                </Td>
                <Td>{animal.name}</Td>
                <Td>${animal.priceUSD.toFixed(2)}</Td>
                <Td>{animal.priceGEL} ₾</Td>
                <Td>{animal.description}</Td>
                <Td>
                  <Badge $popular={animal.isPopular}>
                    {animal.isPopular ? 'Popular' : 'Regular'}
                  </Badge>
                </Td>
                <Td>{animal.stock}</Td>
                <ActionsCell>
                  <IconButton
                    title="Manage categories"
                    onClick={() => setModalState({ mode: 'categories', animal })}
                  >
                    <Tags size={16} />
                  </IconButton>
                  <IconButton
                    title="Edit animal"
                    onClick={() => setModalState({ mode: 'edit', animal })}
                  >
                    <Pencil size={16} />
                  </IconButton>
                  <IconButton
                    title="Delete animal"
                    onClick={() => setModalState({ mode: 'delete', animal })}
                  >
                    <Trash2 size={16} />
                  </IconButton>
                </ActionsCell>
              </Tr>
            ))}
          </tbody>
        </Table>

        {!loading && filteredItems.length === 0 && (
          <EmptyState>No animals found</EmptyState>
        )}
      </TableWrapper>

      {modalState.mode === 'create' && (
        <Modal title="New Animal" onClose={() => setModalState({ mode: 'closed' })}>
          <AnimalForm
            submitting={submitting}
            onSubmit={handleCreate}
            onCancel={() => setModalState({ mode: 'closed' })}
          />
        </Modal>
      )}

      {modalState.mode === 'edit' && (
        <Modal title="Edit Animal" onClose={() => setModalState({ mode: 'closed' })}>
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
          title="Delete Animal"
          message={`Are you sure you want to delete "${modalState.animal.name}"?`}
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
