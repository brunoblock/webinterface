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

import Uploader
  from '@widget/Uploader'



class Upload extends React.Component {
  render () {
    return (
      <ThemeProvider theme={ themes.PRL }>
        <Card bordered>
          <Title>Upload a File</Title>
          <Hr />
          <p><b>DISCLAIMER:</b> No PRL is required to use the beta Mainnet.
          <Br />This is a beta phase and should not be used for important data.
          <Br />Uploads cost 1 PRL per 64GB per year (paid for by Oyster).</p>
          <Uploader />
        </Card>
      </ThemeProvider>
    )
  }
}

export default Upload