import styled from 'styled-components'
import themes from 'themes'

import Section from '@component/Section'

const ThemedSection = styled(Section)`
  background: ${ props => props.theme.primary }
  color: ${ props => props.theme.textSecondary }
`

Section.defaultProps = {
  theme: themes.default
}

export default ThemedSection