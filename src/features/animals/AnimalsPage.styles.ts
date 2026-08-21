import styled from 'styled-components'

export const SearchInput = styled.input`
  width: 280px;
  padding: 9px 14px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #1a1a1a;
  }
`

export const Badge = styled.span<{ $popular: boolean }>`
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 12px;
  background-color: ${({ $popular }) => ($popular ? '#eaf7ee' : '#f2f2f2')};
  color: ${({ $popular }) => ($popular ? '#2f9e57' : '#8a8a8a')};
`

export const ToolbarRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`
