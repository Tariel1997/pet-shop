import { X } from 'lucide-react'

import { BannerWrapper, DismissButton } from './styles/ErrorBanner.styles.ts'

interface ErrorBannerProps {
  message: string
  onDismiss: () => void
}

export const ErrorBanner = ({ message, onDismiss }: ErrorBannerProps) => (
  <BannerWrapper>
    <span>{message}</span>
    <DismissButton type="button" onClick={onDismiss}>
      <X size={16} />
    </DismissButton>
  </BannerWrapper>
)
