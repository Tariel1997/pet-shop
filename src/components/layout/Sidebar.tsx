import {
  LogoCircle,
  LogoRow,
  LogoText,
  NavIcon,
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
        <NavIcon>🐾</NavIcon>
        Animals
      </NavItem>
      <NavItem to="/categories">
        <NavIcon>📁</NavIcon>
        Categories
      </NavItem>
      <NavItem to="/animals-with-categories">
        <NavIcon>🔗</NavIcon>
        Animals With Categories
      </NavItem>
    </NavList>
  </SidebarWrapper>
)
