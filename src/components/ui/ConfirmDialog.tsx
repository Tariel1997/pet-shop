import { Modal } from './Modal.tsx'
import { DangerButton, SecondaryButton } from './styles/Button.styles.ts'
import { FormActions } from './styles/Form.styles.ts'

interface ConfirmDialogProps {
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmDialog = ({
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => (
  <Modal title={title} onClose={onCancel}>
    <p>{message}</p>
    <FormActions>
      <SecondaryButton type="button" onClick={onCancel}>
        გაუქმება
      </SecondaryButton>
      <DangerButton type="button" onClick={onConfirm}>
        წაშლა
      </DangerButton>
    </FormActions>
  </Modal>
)
