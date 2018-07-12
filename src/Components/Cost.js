import styled from 'styled-components'
import React, { Component } from 'react'
import themes from 'themes'



class CostComponent extends Component {
  render () {
    return (
      <span className={ this.props.className }>
        { Math.ceil((this.props.file || { size: 0 }).size / 1000000000) / 64 * this.props.retention } PRL
      </span>
    )
  }
}

const Cost = styled(CostComponent)`
  background: ${ props => props.theme.textPrimary }

  padding: .25em .6em
  margin: .5rem
`

Cost.defaultProps = {
  theme: themes.default
}

export default Cost

