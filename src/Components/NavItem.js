import styled from 'styled-components'
import { Link } from 'react-router'
import themes from 'themes'

const NavItem = styled.a`
  font-size: inherit
  text-decoration: none
  vertical-align: middle
  margin: 0
  display: inline-flex
  align-items: center
  padding: 0 .5rem
  color: ${ props => props.theme.textSecondary }
`

NavItem.defaultProps = {
  theme: themes.default
}

export default NavItem