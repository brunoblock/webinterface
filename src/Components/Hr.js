import styled from 'styled-components'
import themes from 'themes'

const Hr = styled.hr`
  width: 5rem
  border: 0
  margin: .5rem auto 2.5rem 0
  border-top: .5rem solid ${ props => props.theme.secondary }
`

Hr.defaultProps = {
  theme: themes.default
}

export default Hr