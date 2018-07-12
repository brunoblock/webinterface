import styled from 'styled-components'
import themes from 'themes'

const Label = styled.label.attrs({
  for: props => props.for  
})`
  display: inline-block
  background: transparent
  color: ${ props => props.theme.primary }

  font-family: inherit
  font-size: 1.25em
  line-height: 1.5
  vertical-align: middle

  margin: .25rem .5rem
  border: 0
`

Label.defaultProps = {
  theme: themes.default
}

export default Label