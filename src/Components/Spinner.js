import styled from 'styled-components'
import React, { Component } from 'react'
import themes from 'themes'



let sizes = {
  small: {
    radius: 10,
    strokeWidth: 3
  },
  medium: {
    radius: 20,
    strokeWidth: 4
  },
  large: {
    radius: 30,
    strokeWidth: 5
  }
}

class SpinnerComponent extends Component {
  render () {
    const size = sizes[this.props.size || 'medium']

    return (
      <svg xmlns="http://www.w3.org/2000/svg"
        className={ this.props.className }
        width={ `${ size.radius * 2 }px` }
        height={ `${ size.radius * 2 }px` }
        viewBox={ `0 0 ${ size.radius * 2 } ${ size.radius * 2 }` }
      >
        <circle fill="none" stroke-linecap="round"
          stroke-width={ size.strokeWidth }
          cx={ size.radius }
          cy={ size.radius }
          r={ size.radius - size.strokeWidth }></circle>
      </svg>
    )
  }
}

const Spinner = styled(SpinnerComponent)`
  vertical-align: middle
  margin: 0 1rem
  animation: rotator 1.5s linear infinite

  circle {
    stroke: ${ props => props.primary ? props.theme.primary : 'currentcolor' }
    stroke-dasharray: ${ props => 2 * Math.PI * (sizes[props.size || 'medium'].radius - sizes[props.size || 'medium'].strokeWidth) }
    transform-origin: center
    animation: stroke 1.5s cubic-bezier(.5,0,.65,1) infinite
  }

  @keyframes rotator {
    0% {
      transform: rotate(0deg) }
    100% {
      transform: rotate(270deg) }
  }

  @keyframes stroke {
    0% {
      stroke-dashoffset: ${ props => 2 * Math.PI * (sizes[props.size || 'medium'].radius - sizes[props.size || 'medium'].strokeWidth) } }
    60% {
      stroke-dashoffset: ${ props => 2 * Math.PI * (sizes[props.size || 'medium'].radius - sizes[props.size || 'medium'].strokeWidth) / 4 }
      transform: rotate(135deg) }
    100% {
      stroke-dashoffset: ${ props => 2 * Math.PI * (sizes[props.size || 'medium'].radius - sizes[props.size || 'medium'].strokeWidth) }
      transform: rotate(450deg) }
  }
`

Spinner.defaultProps = {
  theme: themes.default
}

export default Spinner