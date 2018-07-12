import styled from 'styled-components'
import themes from 'themes'
import mediaQueries from 'media-queries'

const Card = styled.div`
  background: ${ props => props.theme.backgroundEmphasis }
  color: #3a3a3a
  padding: 1.5rem 2rem 2rem 2rem
  margin: 3rem 0
  border-radius: 1em
  box-shadow: 0 0 1.5rem -.5rem rgba(50,50,50,.5);
  border: 0 solid ${ props => props.theme.primary }
  border-left-width: ${ props => props.bordered ? `1em` : `0` }

  &:first-child {
    margin-top: 0
  }
  &:last-child {
    margin-bottom: 0
  }

  @media ${ mediaQueries.small }, ${ mediaQueries.mobile } {
    background: none
    box-shadow: none
    border-left: 0
  }
  @media ${ mediaQueries.large } {
    padding: 3.5rem 4rem 4rem 4rem
    margin: 4.5rem 0
  }
  @media ${ mediaQueries.desktop } {
    padding: 7rem 8rem 7.5rem 8rem
    margin: 6rem 0
  }
`

Card.defaultProps = {
  theme: themes.default
}

export default Card