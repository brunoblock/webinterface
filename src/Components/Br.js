import styled from 'styled-components'

const Br = styled.div`
  height: ${ props => ({ br: '0', small: '1.5rem', medium: '3rem', large: '5rem', xlarge: '7.5rem' })[props.size || 'br'] || '1.5rem' }

  border: 0
  margin: 0

  pointer-events: none
`

export default Br