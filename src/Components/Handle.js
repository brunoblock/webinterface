import styled from 'styled-components'
import themes from 'themes'

const Handle = styled.textarea.attrs({
  readonly: ''
})`
  width: 100%
  height: 3em

  overflow-x: auto
  overflow-y: hidden
  resize: none
  white-space: pre

  background: ${ props => props.theme.textPrimary }
  border-radius: .3rem

  padding: 1em
  border: 0
`

Handle.defaultProps = {
  theme: themes.default
}

export default Handle