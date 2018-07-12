import styled from 'styled-components'

const Label = styled.label`
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