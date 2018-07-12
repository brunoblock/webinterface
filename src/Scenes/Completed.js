import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import themes from 'themes'

import Br
  from '@component/Br'
import Card
  from '@component/Card'
import Handle
  from '@component/Handle'
import Hr
  from '@component/Hr'
import Title
  from '@component/Title'



class Download extends React.Component {
  render () {
    console.log(this)
    return (
      <ThemeProvider theme={ themes.PRL }>
        <Card bordered>
          <Title>Upload Complete</Title>
          <Hr />
          <p>Your file has been successfully uploaded to the Tangle. An Oyster handle has been generated below. This handle is the only way to access your file on the Tangle. Please store this handle in a safe place.</p>
          <Br size="xlarge" />
          <Handle>{ this.props.match.params.handle }</Handle>
        </Card>
      </ThemeProvider>
    )
  }
}

export default Download
