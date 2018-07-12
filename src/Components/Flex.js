import styled from 'styled-components'

const Flex = styled.div`
  display: flex
  align-items: ${ props => props.alignItems || 'flex-start' }
  align-content: ${ props => props.alignContent || 'flex-start' }
  justify-content: ${ props => props.justifyContent || 'flex-start' }
  flex-basis: ${ props => props.flexBasis || 'auto' }
  flex-grow: ${ props => props.flexGrow || '0' }
  flex-shrink: ${ props => props.flexGrow || '0' }
`

export default Flex