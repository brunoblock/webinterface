import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import themes from 'themes'

import Br
  from '@component/Br'
import Card
  from '@component/Card'
import Hr
  from '@component/Hr'
import Title
  from '@component/Title'

import Downloader
  from '@widget/Downloader'



class Download extends React.Component {
  render () {
    return (
      <ThemeProvider theme={ themes.PRL }>
        <Card bordered>
          <Title>Retrieve a File</Title>
          <Hr />
          <p>Enter your Oyster handle below to access your stored file from the Tangle.</p>
          <Br size="xlarge" />
          <Downloader />
        </Card>
      </ThemeProvider>
    )
  }
}

export default Download