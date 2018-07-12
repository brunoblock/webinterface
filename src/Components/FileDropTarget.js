import styled from 'styled-components'
import React, { Component } from 'react'
import themes from 'themes'

import FlexColumn
  from '@component/FlexColumn'



class FileDropTargetComponent extends Component {
  constructor (...args) {
    super(...args)

    this.state = {
      dropping: false
    }
  }

  onDragOver (e) {
    e.stopPropagation()
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  onDragEnter (e) {
    e.stopPropagation()
    e.preventDefault()

    this.setState({
      dropping: true
    })
  }

  onDragExit (e) {
    e.stopPropagation()
    e.preventDefault()

    this.setState({
      dropping: false
    })
  }

  onDrop (e) {
    e.stopPropagation()
    e.preventDefault()

    this.setState({
      dropping: false
    })

    this.props.onDrop(e)
  }

  render () {
    return (
      <div className={ this.props.className }
        onDragEnter={ e => this.onDragEnter.call(this, e) }
        onDragExit={ e => this.onDragExit.call(this, e) }
        onDragOver={ e => this.onDragOver.call(this, e) }
        onDrop={ e => this.onDrop.call(this, e) }
      >
        <div>
          { this.props.children }
        </div>
        <FlexColumn alignItems="center" alignContent="center" justifyContent="center"
          className={ this.state.dropping ? 'dropping' : '' }
        >
          <h1>Drop Your File Here</h1>
        </FlexColumn>
      </div>
    )
  }
}

const FileDropTarget = styled(FileDropTargetComponent)`
  position: static

  & > ${ FlexColumn } {
    width: 100%
    height: 100%
    position: absolute
    top: 0
    left: 0
    z-index: -1

    opacity: 0
    background: rgba(255,255,255,.8);

    user-select: none

    &.dropping {
      opacity: 1
      z-index: 1
    }

    * {
      pointer-events: none
    }

    &:before {
      content: '';
      display: block
      width: calc(100% - 4rem);
      height: calc(100% - 4rem);
      position: absolute
      top: 0
      left: 0
      margin: 2rem
  
      border: .75rem dashed ${ props => props.theme.secondary }
    }
  }
`

FileDropTarget.defaultProps = {
  theme: themes.default
}

export default FileDropTarget