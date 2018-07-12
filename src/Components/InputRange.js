import styled from 'styled-components'
import themes from 'themes'

const InputRange = styled.input.attrs({
  type: 'range'
})`
  display: inline-block
  // account for margin
  max-width: calc(100% - 1em);

  background: transparent
  color: ${ props => props.theme.primary }

  font-family: inherit
  font-size: inherit
  line-height: 1.5
  vertical-align: middle

  margin: .5rem
  padding: 0
  border: 0

  transition: all .1s

  &:disabled {
    cursor: not-allowed
    opacity: .5
  }
`

InputRange.defaultProps = {
  theme: themes.default
}

export default InputRange