import styled from 'styled-components'
import themes from 'themes'

const Nav = styled.nav`
  margin: 0
  border: 0
  display: inline-flex
  flex-grow: 1
  align-items: center
  vertical-align: middle
`

Nav.defaultProps = {
  theme: themes.default
}

export default Nav