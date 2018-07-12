import styled from 'styled-components'
import themes from 'themes'

import ThemedSection from '@component/ThemedSection'
import Spinner from '@component/Spinner'

const Button = styled.button`
  display: inline-block

  font-family: inherit
  font-size: inherit
  font-weight: 600
  line-height: 1.5
  text-transform: uppercase
  text-decoration: none
  vertical-align: middle

  user-select: none
  cursor: ${ props => props.redirects ? 'pointer' : 'default' }

  background: ${ props => props.primary ? props.theme.primary : props.theme.secondary }
  color: ${ props => props.primary ? props.theme.textPrimary : props.theme.primary }
  border: 2px solid ${ props => props.primary || props.outline ? props.theme.primary : props.theme.secondary }
  border-radius: .3rem

  padding: 1em 1.8em
  margin: .5rem

  transition: all .1s

  &:disabled {
    cursor: default
    opacity: .5
    background-image: repeating-linear-gradient(
      -45deg,
      alpha(${ props => props.primary ? props.theme.textPrimary : props.theme.primary }, .1),
      alpha(${ props => props.primary ? props.theme.textPrimary : props.theme.primary }, .1) .25rem,
      transparent .25rem,
      transparent 1rem
    );
  }

  &:not(:disabled):hover {
    background: ${ props => props.outline ? props.theme.primary : props.theme.textPrimary }
    color: ${ props => props.outline ? props.theme.textPrimary : props.theme.primary }
    border-color: ${ props => props.theme.primary }
    box-shadow: 0 0 1rem -.25rem rgba(50,50,50,.5);
  }

  ${ ThemedSection } & {
    background: ${ props => props.primary ? props.theme.textPrimary : `transparent` }
    color: ${ props => props.primary ? props.theme.primary : props.theme.textPrimary }
    border-color: ${ props => props.primary || props.outline ? props.theme.textPrimary : props.theme.primary }

    &:not(:disabled):hover {
      background: ${ props => props.outline ? props.theme.textPrimary : props.theme.primary }
      color: ${ props => props.outline ? props.theme.primary : props.theme.textPrimary }
      border-color: ${ props => props.theme.textPrimary }
    }
  }

  ${ Spinner } {
    margin-left: -.5em
  }
`

Button.defaultProps = {
  theme: themes.default
}

export default Button