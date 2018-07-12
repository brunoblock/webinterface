import styled from 'styled-components'
import { Link } from 'react-router'

import Button from '@component/Button'

const ButtonLink = styled(Button.withComponent(Link))`
  cursor: pointer
`

export default ButtonLink