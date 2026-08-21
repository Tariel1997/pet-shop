import styled from 'styled-components'

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`

export const ModalBox = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 24px;
  width: 420px;
  max-width: calc(100vw - 32px);
  max-height: calc(100vh - 64px);
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
`

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`

export const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #1a1a1a;
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #8a8a8a;
  line-height: 1;

  &:hover {
    color: #1a1a1a;
  }
`
