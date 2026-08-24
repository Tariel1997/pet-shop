import styled from 'styled-components'

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`

export const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`

export const TableWrapper = styled.div`
  border: 1px solid #eaeaea;
  border-radius: 12px;
  overflow: hidden;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

export const Thead = styled.thead`
  background-color: #fafafa;
`

export const Th = styled.th`
  text-align: left;
  padding: 14px 20px;
  font-size: 13px;
  font-weight: 500;
  color: #8a8a8a;
  border-bottom: 1px solid #eaeaea;
`

export const Tr = styled.tr`
  &:hover {
    background-color: #fafafa;
  }
`

export const Td = styled.td`
  padding: 14px 20px;
  font-size: 14px;
  color: #2a2a2a;
  border-bottom: 1px solid #f0f0f0;
`

export const ActionsCell = styled(Td)`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`

export const EmptyState = styled.div`
  padding: 40px;
  text-align: center;
  color: #9a9a9a;
  font-size: 14px;
`

export const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  object-fit: cover;
  background-color: #f0f0f0;
  display: block;
`

export const AvatarPlaceholder = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b5b5b5;
`
