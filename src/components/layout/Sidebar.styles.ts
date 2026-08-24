import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const SidebarWrapper = styled.aside`
  width: 260px;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 24px 16px;
  box-sizing: border-box;
  border-right: 1px solid #e5e5e5;
`

export const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 8px 32px;
`

export const LogoCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2b3b4e, #1a2530);
  flex-shrink: 0;
`

export const LogoText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
`

export const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 8px;
  border-radius: 8px;
  color: #4a4a4a;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    background-color: #ebebeb;
  }

  &.active {
    background-color: #e4e4e4;
    color: #1a1a1a;
    font-weight: 600;
  }
`
