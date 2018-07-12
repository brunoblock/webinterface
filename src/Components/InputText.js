import styled from 'styled-components'
import themes from 'themes'

const InputText = styled.input.attrs({
  type: 'text'
})`
  display: inline-block
  // account for margin
  max-width: calc(100% - 1em);

  background: transparent
  color: ${ props => props.theme.primary }
  outline: 0

  font-family: inherit
  font-size: inherit
  line-height: 1.5
  vertical-align: middle

  margin: .5rem
  padding: .5em
  border: 0 solid ${ props => props.theme.secondary }
  border-bottom-width: 2px

  transition: all .1s

  &:focus {
    border-color: ${ props => props.theme.primary }
  }
`

InputText.defaultProps = {
  theme: themes.default
}

export default InputText