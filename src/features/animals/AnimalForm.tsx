import { useState, type FormEvent, type KeyboardEvent } from 'react'

import { convertGelToUsd } from '../../api/currency.api.ts'
import {
  PrimaryButton,
  SecondaryButton,
} from '../../components/ui/styles/Button.styles.ts'
import {
  CheckboxRow,
  ErrorText,
  FieldGroup,
  FormActions,
  FormWrapper,
  Input,
  Label,
  TextArea,
} from '../../components/ui/styles/Form.styles.ts'
import type { Animal, AnimalFormData } from '../../types/animal.ts'

interface AnimalFormProps {
  initialData?: Animal
  submitting: boolean
  onSubmit: (data: AnimalFormData) => void
  onCancel: () => void
}

const blockInvalidNumberKey = (event: KeyboardEvent<HTMLInputElement>) => {
  if (['-', '+', 'e', 'E'].includes(event.key)) {
    event.preventDefault()
  }
}

export const AnimalForm = ({
  initialData,
  submitting,
  onSubmit,
  onCancel,
}: AnimalFormProps) => {
  const [name, setName] = useState<string>(initialData?.name ?? '')
  const [priceGEL, setPriceGEL] = useState<string>(
    initialData ? String(initialData.priceGEL) : '',
  )
  const [description, setDescription] = useState<string>(
    initialData?.description ?? '',
  )
  const [isPopular, setIsPopular] = useState<boolean>(
    initialData?.isPopular ?? false,
  )
  const [stock, setStock] = useState<string>(
    initialData ? String(initialData.stock) : '',
  )
  const [imageUrl, setImageUrl] = useState<string>(initialData?.imageUrl ?? '')
  const [validationError, setValidationError] = useState<string | null>(null)
  const [converting, setConverting] = useState<boolean>(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!name.trim()) {
      setValidationError('Name is required')
      return
    }

    if (!description.trim()) {
      setValidationError('Description is required')
      return
    }

    if (!imageUrl.trim()) {
      setValidationError('Image URL is required')
      return
    }

    const priceGELValue = Number(priceGEL)
    const stockValue = Number(stock)

    if (
      priceGEL.trim() === '' ||
      Number.isNaN(priceGELValue) ||
      priceGELValue <= 0
    ) {
      setValidationError('Price (GEL) must be greater than 0')
      return
    }

    if (stock.trim() === '' || Number.isNaN(stockValue) || stockValue <= 0) {
      setValidationError('Stock must be greater than 0')
      return
    }

    setValidationError(null)

    try {
      setConverting(true)
      const priceUSDValue = await convertGelToUsd(priceGELValue)

      onSubmit({
        name: name.trim(),
        priceUSD: priceUSDValue,
        priceGEL: priceGELValue,
        description: description.trim(),
        isPopular,
        stock: stockValue,
        imageUrl: imageUrl.trim(),
      })
    } catch {
      setValidationError('Could not calculate the USD price, please try again')
    } finally {
      setConverting(false)
    }
  }

  const isBusy = submitting || converting

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <FieldGroup>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. Andrew Bojangles"
        />
      </FieldGroup>

      <FieldGroup>
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          type="url"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
          placeholder="https://example.com/photo.jpg"
        />
      </FieldGroup>

      <FieldGroup>
        <Label htmlFor="priceGEL">Price (GEL)</Label>
        <Input
          id="priceGEL"
          type="number"
          min={1}
          step="0.01"
          value={priceGEL}
          onKeyDown={blockInvalidNumberKey}
          onChange={(event) => setPriceGEL(event.target.value)}
        />
      </FieldGroup>

      <FieldGroup>
        <Label htmlFor="stock">Stock</Label>
        <Input
          id="stock"
          type="number"
          min={1}
          step="1"
          value={stock}
          onKeyDown={blockInvalidNumberKey}
          onChange={(event) => setStock(event.target.value)}
        />
      </FieldGroup>

      <FieldGroup>
        <Label htmlFor="description">Description</Label>
        <TextArea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </FieldGroup>

      <CheckboxRow>
        <input
          type="checkbox"
          checked={isPopular}
          onChange={(event) => setIsPopular(event.target.checked)}
        />
        Popular
      </CheckboxRow>

      {validationError && <ErrorText>{validationError}</ErrorText>}

      <FormActions>
        <SecondaryButton type="button" onClick={onCancel}>
          Cancel
        </SecondaryButton>
        <PrimaryButton type="submit" disabled={isBusy}>
          {converting
            ? 'Calculating USD price...'
            : submitting
              ? 'Saving...'
              : 'Save'}
        </PrimaryButton>
      </FormActions>
    </FormWrapper>
  )
}
