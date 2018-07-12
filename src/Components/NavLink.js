import styled from 'styled-components'
import { Link } from 'react-router'

import NavItem from '@component/NavItem'

const NavLink = styled(NavItem.withComponent(Link))`
`

export default NavLink