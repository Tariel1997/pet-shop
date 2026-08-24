import { Link2, PawPrint, Tags } from 'lucide-react'

import {
  LogoCircle,
  LogoRow,
  LogoText,
  NavItem,
  NavList,
  SidebarWrapper,
} from './Sidebar.styles.ts'

export const Sidebar = () => (
  <SidebarWrapper>
    <LogoRow>
      <LogoCircle />
      <LogoText>PetAdmin</LogoText>
    </LogoRow>

    <NavList>
      <NavItem to="/animals">
        <PawPrint size={18} />
        Animals
      </NavItem>
      <NavItem to="/categories">
        <Tags size={18} />
        Categories
      </NavItem>
      <NavItem to="/animals-with-categories">
        <Link2 size={18} />
        Animals With Categories
      </NavItem>
    </NavList>
  </SidebarWrapper>
)
