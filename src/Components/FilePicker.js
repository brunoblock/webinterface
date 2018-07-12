import styled from 'styled-components'
import React, { Component } from 'react'
import themes from 'themes'



const InputFile = styled.input.attrs({
  type: 'file'
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

InputFile.defaultProps = {
  theme: themes.default
}

class FilePickerComponent extends Component {
  render () {
    return (
      <div className={ this.props.className }>
        <InputFile { ...this.props } innerRef={ el => this.refs.fileInput = el } />
      </div>
    )
  }
}

const FilePicker = styled(FilePickerComponent)`
`

export default FilePicker