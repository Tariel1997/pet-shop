import type { ReactNode } from 'react'

import { ContentArea, LayoutWrapper } from './Layout.styles.ts'
import { Sidebar } from './Sidebar.tsx'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => (
  <LayoutWrapper>
    <Sidebar />
    <ContentArea>{children}</ContentArea>
  </LayoutWrapper>
)
