import styled from 'styled-components'
import mediaQueries from 'media-queries'

const Section = styled.section`
  background: transparent
  padding: 3rem 2rem 3rem 2rem
  margin: 0

  @media ${ mediaQueries.large } {
    padding: 4.5rem 2rem 4.5rem 2rem
  }
  @media ${ mediaQueries.desktop } {
    padding: 6rem 2rem 6rem 2rem
  }
`

export default Section