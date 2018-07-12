import styled from 'styled-components'
import themes from 'themes'

import ThemedSection from '@component/ThemedSection'

const Title = styled.h1`
  font-size: 3rem
  margin: .5em 0 .25em 0
  color: ${ props => props.theme.textEmphasis }

  &:first-child {
    margin-top: 0
  }

  ${ ThemedSection } & {
    color: ${ props => props.theme.textPrimary }
  }
`

Title.defaultProps = {
  theme: themes.default
}

export default Title