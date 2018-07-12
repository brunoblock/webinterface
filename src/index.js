import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link } from 'react-router'
import styled from 'styled-components'

import Landing
  from '@scene/Landing'
import Upload
  from '@scene/Upload'
import Download
  from '@scene/Download'
import Completed
  from '@scene/Completed'

import Section
  from '@component/Section'

import StorageHeader
  from '@widget/StorageHeader'



const Document = styled.div`
  & > * {
    border-left: calc(30vw - 200px) solid transparent
    border-right: calc(30vw - 200px) solid transparent
  }
`

class App extends React.Component {
  render () {
    return (
      <Document>
        <StorageHeader />

        <Section>
          <Route exact path="/" component={ Landing } />
          <Route exact path="/upload" component={ Upload } />
          <Route exact path="/download" component={ Download } />
          <Route exact path="/file/:handle" component={ Completed } />
        </Section>
      </Document>
    )
  }
}



ReactDOM.render((
  <Router>
    <App/>
  </Router>
), document.getElementById('app'))

