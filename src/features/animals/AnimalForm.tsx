import { useState, type FormEvent } from 'react'

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

export const AnimalForm = ({
  initialData,
  submitting,
  onSubmit,
  onCancel,
}: AnimalFormProps) => {
  const [name, setName] = useState<string>(initialData?.name ?? '')
  const [priceUSD, setPriceUSD] = useState<string>(
    initialData ? String(initialData.priceUSD) : '',
  )
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
  const [validationError, setValidationError] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!name.trim()) {
      setValidationError('სახელი სავალდებულოა')
      return
    }

    if (priceUSD.trim() === '' || priceGEL.trim() === '' || stock.trim() === '') {
      setValidationError('ფასები და მარაგი სავალდებულოა')
      return
    }

    setValidationError(null)
    onSubmit({
      name: name.trim(),
      priceUSD: Number(priceUSD),
      priceGEL: Number(priceGEL),
      description: description.trim(),
      isPopular,
      stock: Number(stock),
    })
  }

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <FieldGroup>
        <Label htmlFor="name">სახელი</Label>
        <Input
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="მაგ. Andrew Bojangles"
        />
      </FieldGroup>

      <FieldGroup>
        <Label htmlFor="priceUSD">ფასი (USD)</Label>
        <Input
          id="priceUSD"
          type="number"
          value={priceUSD}
          onChange={(event) => setPriceUSD(event.target.value)}
        />
      </FieldGroup>

      <FieldGroup>
        <Label htmlFor="priceGEL">ფასი (GEL)</Label>
        <Input
          id="priceGEL"
          type="number"
          value={priceGEL}
          onChange={(event) => setPriceGEL(event.target.value)}
        />
      </FieldGroup>

      <FieldGroup>
        <Label htmlFor="stock">მარაგი</Label>
        <Input
          id="stock"
          type="number"
          value={stock}
          onChange={(event) => setStock(event.target.value)}
        />
      </FieldGroup>

      <FieldGroup>
        <Label htmlFor="description">აღწერა</Label>
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
        პოპულარული
      </CheckboxRow>

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
