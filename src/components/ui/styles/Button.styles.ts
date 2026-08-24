import styled from 'styled-components'

export const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: #1a1a1a;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #333333;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: #ffffff;
  color: #1a1a1a;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 9px 16px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`

export const DangerButton = styled(SecondaryButton)`
  color: #c0392b;
  border-color: #f0d5d1;

  &:hover {
    background-color: #fdf1f0;
  }
`

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: #4a4a4a;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;

  &:hover {
    background-color: #f0f0f0;
  }
`
