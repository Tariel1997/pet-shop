import { useState, type FormEvent } from 'react'

import {
  PrimaryButton,
  SecondaryButton,
} from '../../components/ui/styles/Button.styles.ts'
import {
  ErrorText,
  FieldGroup,
  FormActions,
  FormWrapper,
  Input,
  Label,
  TextArea,
} from '../../components/ui/styles/Form.styles.ts'
import type { Category, CategoryFormData } from '../../types/category.ts'

interface CategoryFormProps {
  initialData?: Category
  submitting: boolean
  onSubmit: (data: CategoryFormData) => void
  onCancel: () => void
}

export const CategoryForm = ({
  initialData,
  submitting,
  onSubmit,
  onCancel,
}: CategoryFormProps) => {
  const [title, setTitle] = useState<string>(initialData?.title ?? '')
  const [description, setDescription] = useState<string>(
    initialData?.description ?? '',
  )
  const [validationError, setValidationError] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!title.trim()) {
      setValidationError('Title is required')
      return
    }

    if (!description.trim()) {
      setValidationError('Description is required')
      return
    }

    setValidationError(null)
    onSubmit({ title: title.trim(), description: description.trim() })
  }

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <FieldGroup>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="e.g. Dogs"
        />
      </FieldGroup>

      <FieldGroup>
        <Label htmlFor="description">Description</Label>
        <TextArea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="A short description of the category"
        />
      </FieldGroup>

      {validationError && <ErrorText>{validationError}</ErrorText>}

      <FormActions>
        <SecondaryButton type="button" onClick={onCancel}>
          Cancel
        </SecondaryButton>
        <PrimaryButton type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save'}
        </PrimaryButton>
      </FormActions>
    </FormWrapper>
  )
}
