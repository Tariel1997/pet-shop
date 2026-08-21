import { useEffect, useState } from 'react'

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
import { clearError } from '../../store/categories/categories.slice.ts'
import {
  addCategory,
  editCategory,
  loadCategories,
  removeCategory,
} from '../../store/categories/categories.thunks.ts'
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts'
import type { Category, CategoryFormData } from '../../types/category.ts'
import { CategoryForm } from './CategoryForm.tsx'

type ModalState =
  | { mode: 'closed' }
  | { mode: 'create' }
  | { mode: 'edit'; category: Category }
  | { mode: 'delete'; category: Category }

export const CategoriesPage = () => {
  const dispatch = useAppDispatch()
  const { items, loading, error } = useAppSelector((state) => state.categories)
  const [modalState, setModalState] = useState<ModalState>({ mode: 'closed' })
  const [submitting, setSubmitting] = useState<boolean>(false)

  useEffect(() => {
    dispatch(loadCategories())
  }, [dispatch])

  const handleCreate = async (data: CategoryFormData) => {
    setSubmitting(true)
    await dispatch(addCategory(data))
    setSubmitting(false)
    setModalState({ mode: 'closed' })
  }

  const handleEdit = async (id: string, data: CategoryFormData) => {
    setSubmitting(true)
    await dispatch(editCategory({ id, categoryData: data }))
    setSubmitting(false)
    setModalState({ mode: 'closed' })
  }

  const handleDelete = async (id: string) => {
    setSubmitting(true)
    await dispatch(removeCategory(id))
    setSubmitting(false)
    setModalState({ mode: 'closed' })
  }

  return (
    <div>
      <PageHeader>
        <PageTitle>Categories</PageTitle>
        <PrimaryButton onClick={() => setModalState({ mode: 'create' })}>
          + კატეგორიის დამატება
        </PrimaryButton>
      </PageHeader>

      {error && (
        <ErrorBanner message={error} onDismiss={() => dispatch(clearError())} />
      )}

      <TableWrapper>
        <Table>
          <Thead>
            <tr>
              <Th>სათაური</Th>
              <Th>აღწერა</Th>
              <Th />
            </tr>
          </Thead>
          <tbody>
            {items.map((category) => (
              <Tr key={category.id}>
                <Td>{category.title}</Td>
                <Td>{category.description}</Td>
                <ActionsCell>
                  <IconTextButton
                    onClick={() => setModalState({ mode: 'edit', category })}
                  >
                    რედაქტირება
                  </IconTextButton>
                  <IconTextButton
                    onClick={() => setModalState({ mode: 'delete', category })}
                  >
                    წაშლა
                  </IconTextButton>
                </ActionsCell>
              </Tr>
            ))}
          </tbody>
        </Table>

        {!loading && items.length === 0 && (
          <EmptyState>კატეგორიები არ მოიძებნა</EmptyState>
        )}
      </TableWrapper>

      {modalState.mode === 'create' && (
        <Modal
          title="ახალი კატეგორია"
          onClose={() => setModalState({ mode: 'closed' })}
        >
          <CategoryForm
            submitting={submitting}
            onSubmit={handleCreate}
            onCancel={() => setModalState({ mode: 'closed' })}
          />
        </Modal>
      )}

      {modalState.mode === 'edit' && (
        <Modal
          title="კატეგორიის რედაქტირება"
          onClose={() => setModalState({ mode: 'closed' })}
        >
          <CategoryForm
            initialData={modalState.category}
            submitting={submitting}
            onSubmit={(data) => handleEdit(modalState.category.id, data)}
            onCancel={() => setModalState({ mode: 'closed' })}
          />
        </Modal>
      )}

      {modalState.mode === 'delete' && (
        <ConfirmDialog
          title="კატეგორიის წაშლა"
          message={`დარწმუნებული ხართ, რომ გსურთ წაშალოთ "${modalState.category.title}"?`}
          onConfirm={() => handleDelete(modalState.category.id)}
          onCancel={() => setModalState({ mode: 'closed' })}
        />
      )}
    </div>
  )
}
