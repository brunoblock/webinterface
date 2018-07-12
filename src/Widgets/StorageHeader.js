import styled, { ThemeProvider } from 'styled-components'
import React, { Component } from 'react'
import themes from 'themes'
import mediaQueries from 'media-queries'

import Header
  from '@component/Header'
import Nav
  from '@component/Nav'
import NavItem
  from '@component/NavItem'
import NavLink
  from '@component/NavLink'
import Logo
  from '@component/Logo'
import LogoText
  from '@component/LogoText'
import FlexSpacer
  from '@component/FlexSpacer'

class StorageHeaderComponent extends Component {
  render () {
    return (
      <ThemeProvider theme={ themes.PRL }>
        <Header className={ this.props.className }>
          <Nav>
            <NavLink id="logo" to='/'>
              <Logo />
              <LogoText>Oyster Storage</LogoText>
            </NavLink>
            <FlexSpacer />
            <NavItem href='//oysterprotocol.com'>Oyster Home</NavItem>
          </Nav>
        </Header>
      </ThemeProvider>
    )
  }
}

const StorageHeader = styled(StorageHeaderComponent)`
  @media ${ mediaQueries.mobile } {
    ${ Nav } {
      justify-content: center
    }
    #logo ${ LogoText } {
      display: none
    }
  }
  @media ${ mediaQueries.small }, ${ mediaQueries.mobile } {
    ${ Nav } > *:not(#logo) {
      display: none
    }
  }
`

export default StorageHeader