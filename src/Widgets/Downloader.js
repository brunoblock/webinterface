/*                                                                                  *\
|  test.txt3d5505da84272528b7ef68ac6b36b7823f281b8e2a5651c043c9cf2e5e44ccc4V6ReLDUY  |
|  Oyster_Sc169b28a7d107ceab8c383cb79d9a06dfa2a3c2299c8629a777d562e024aacb7NNNBeLqS  |
\*                                                                                  */

import styled, { ThemeProvider } from 'styled-components'
import React, { Component } from 'react'
import themes from 'themes'

import Oyster from 'oyster-streamable'
import * as FileSaver from 'filesaver'

import Br
  from '@component/Br'
import Button
  from '@component/Button'
import InputText
  from '@component/InputText'
import Label
  from '@component/Label'
import Spinner
  from '@component/Spinner'

class DownloaderComponent extends Component {
  constructor (...args) {
    super(...args)

    this.state = {
      valid: false,
      loading: false,
      status: null,

      handle: null,
      lastHandle: null,

      metadata: null,
      download: null,
      file: null
    }

    console.log(`Downloader.js`, this)
  }

  changeHandle (input) {
    return new Promise((resolve, reject) => {
      input = input.trim()

      if (input != this.state.lastHandle)
        this.setState({ metadata: null })

      this.setState({
        valid: input.length == 80,
        handle: input.length == 80 ? input : null
      }, _ => {
        this.changeMetadata().then(_ => {
          resolve()
        })
      })
    })
  }

  changeMetadata () {
    return new Promise((resolve, reject) => {
      if (this.state.handle && this.state.handle != this.state.lastHandle) {
        this.setState({
          loading: true,
          status: 'Retrieving Metadata'
        })

        this.changeDownload().then(_ => {
          this.state.download.getMetadata().then(meta => {
            console.log(meta)
            this.setState({
              metadata: meta,
              lastHandle: this.state.handle,
              loading: false,
              status: null
            }, _ => {
              resolve()
            })
          }).catch(err => {
            this.showError(err)
            reject(err)
          })
        })
      } else {
        resolve()
      }
    })
  }

  changeFile (file) {
    return new Promise((resolve, reject) => {
      this.setState({
        file: file
      }, _ => {
        FileSaver.saveAs(file.result, file.metadata.fileName)
        resolve()
      })
    })
  }

  changeDownload () {
    return new Promise((resolve, reject) => {
      const download = Oyster.Download.toBlob(this.state.handle)

      download.on('finish', file => {
        this.changeFile(file)

        this.setState({
          loading: false,
          status: null
        })
      })

      download.on('error', err => {
        this.showError(err)
        reject(err)
      })

      this.setState({
        download: download
      }, _ => {
        resolve()
      })
    })
  }

  startDownload () {
    return new Promise((resolve, reject) => {
      this.setState({
        loading: true,
        status: 'Retrieving File'
      })

      this.changeMetadata().then(_ => {
        this.state.download.startDownload(this.state.metadata)
        resolve()
      })
    })
  }

  showError (err) {
    return new Promise((resolve, reject) => {
      console.error(err)

      this.setState({
        loading: false,
        status: null
      }, _ => {
        resolve()
      })
    })
  }



  render () {
    return (
      <ThemeProvider theme={ themes.PRL }>
        <div className={ this.props.className }>
          <Label for="handle">Oyster Handle:</Label>
          <InputText id="handle"
            onInput={ e => this.changeHandle(e.target.value) } />
          <Br size="small" />

          <Button redirects primary
            onClick={ e => this.startDownload() }
            disabled={ !this.state.valid || this.state.loading }
          >
            { this.state.loading && <Spinner size="small" /> }
            { this.state.status || 'Retrieve File' }
          </Button>
        </div>
      </ThemeProvider>
    )
  }
}

const Downloader = styled(DownloaderComponent)``

export default Downloader