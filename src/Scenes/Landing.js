import React from 'react'
import { Link } from 'react-router'
import styled, { ThemeProvider } from 'styled-components'

import themes from 'themes'

import Br
  from '@component/Br'
import ButtonLink
  from '@component/ButtonLink'
import Card
  from '@component/Card'
import FlexColumn
  from '@component/FlexColumn'
import FlexRow
  from '@component/FlexRow'
import Section
  from '@component/Section'



class Landing extends React.Component {
  render () {
    return (
      <ThemeProvider theme={ themes.PRL }>
        <Card bordered>
          <FlexRow justifyContent="center">
            <FlexColumn flexBasis="260px" flexGrow="1" alignItems="center">
              <Br size="medium" />
              <img width="100" src="/images/icons/upload.png" />
              <Br size="medium" />
              <ButtonLink primary to="/upload">Upload a File</ButtonLink>
              <p>Use Oyster to host a file on the Tangle.</p>
            </FlexColumn>
            <FlexColumn flexBasis="260px" flexGrow="1" alignItems="center">
              <Br size="medium" />
              <img width="100" src="/images/icons/download.png" />
              <Br size="medium" />
              <ButtonLink primary to="/download">Retrieve a File</ButtonLink>
              <p>Use an Oyster handle to retrieve a file from the Tangle.</p>
            </FlexColumn>
          </FlexRow>
        </Card>
      </ThemeProvider>
    )
  }
}

export default Landing