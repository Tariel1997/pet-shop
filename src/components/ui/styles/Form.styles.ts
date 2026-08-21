import styled from 'styled-components'

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const Label = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: #4a4a4a;
`

export const Input = styled.input`
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #1a1a1a;
  }
`

export const TextArea = styled.textarea`
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
  outline: none;
  resize: vertical;
  min-height: 80px;

  &:focus {
    border-color: #1a1a1a;
  }
`

export const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #2a2a2a;
`

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
`

export const ErrorText = styled.p`
  color: #c0392b;
  font-size: 13px;
  margin: 0;
`
