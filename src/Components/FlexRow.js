import styled from 'styled-components'

import Flex from '@component/Flex'

const FlexRow = styled(Flex)`
  flex-direction: row
  flex-wrap: ${ props => props.flexWrap || 'wrap' }
`

export default FlexRow