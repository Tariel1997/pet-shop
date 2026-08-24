import { X } from 'lucide-react'
import type { ReactNode } from 'react'

import {
  CloseButton,
  ModalBox,
  ModalHeader,
  ModalTitle,
  Overlay,
} from './styles/Modal.styles.ts'

interface ModalProps {
  title: string
  onClose: () => void
  children: ReactNode
}

export const Modal = ({ title, onClose, children }: ModalProps) => (
  <Overlay onClick={onClose}>
    <ModalBox onClick={(event) => event.stopPropagation()}>
      <ModalHeader>
        <ModalTitle>{title}</ModalTitle>
        <CloseButton type="button" onClick={onClose}>
          <X size={18} />
        </CloseButton>
      </ModalHeader>
      {children}
    </ModalBox>
  </Overlay>
)
