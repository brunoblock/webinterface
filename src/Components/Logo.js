import styled from 'styled-components'
import themes from 'themes'

const Logo = styled.img.attrs({ src: props => props.theme.logo })`
  width: 5rem
  height: 5rem
  margin: 0
  vertical-align: middle
`

Logo.defaultProps = {
  theme: themes.default
}

export default Logo