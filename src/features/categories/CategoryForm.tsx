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
      setValidationError('სათაური სავალდებულოა')
      return
    }

    setValidationError(null)
    onSubmit({ title: title.trim(), description: description.trim() })
  }

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <FieldGroup>
        <Label htmlFor="title">სათაური</Label>
        <Input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="მაგ. ძაღლები"
        />
      </FieldGroup>

      <FieldGroup>
        <Label htmlFor="description">აღწერა</Label>
        <TextArea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="კატეგორიის მოკლე აღწერა"
        />
      </FieldGroup>

      {validationError && <ErrorText>{validationError}</ErrorText>}

      <FormActions>
        <SecondaryButton type="button" onClick={onCancel}>
          გაუქმება
        </SecondaryButton>
        <PrimaryButton type="submit" disabled={submitting}>
          {submitting ? 'ინახება...' : 'შენახვა'}
        </PrimaryButton>
      </FormActions>
    </FormWrapper>
  )
}
