import styled from 'styled-components'
import themes from 'themes'

const Header = styled.header`
  background: ${ props => props.theme.primary }
  padding: 1.5rem 2rem
  margin: 0
  display: flex
  align-items: center
  box-shadow: 0 0 2rem 0 rgba(50,50,50,.5);
  border: 0 solid ${ props => props.theme.primary }
  border-left-width: ${ props => props.bordered ? `1em` : `0` }
`

Header.defaultProps = {
  theme: themes.default
}

export default Header