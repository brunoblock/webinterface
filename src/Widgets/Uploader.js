/*                                                                                  *\
|  test.txt3d5505da84272528b7ef68ac6b36b7823f281b8e2a5651c043c9cf2e5e44ccc4V6ReLDUY  |
|  Oyster_Sc169b28a7d107ceab8c383cb79d9a06dfa2a3c2299c8629a777d562e024aacb7NNNBeLqS  |
\*                                                                                  */

import styled, { ThemeProvider } from 'styled-components'
import React, { Component } from 'react'
import { withRouter } from 'react-router'
import themes from 'themes'

import Oyster from 'oyster-streamable'

import Br
  from '@component/Br'
import Button
  from '@component/Button'
import ButtonSelect
  from '@component/ButtonSelect'
import Cost
  from '@component/Cost'
import FilePicker
  from '@component/FilePicker'
import FileDropTarget
  from '@component/FileDropTarget'
import FlexColumn
  from '@component/FlexColumn'
import FlexRow
  from '@component/FlexRow'
import InputRange
  from '@component/InputRange'
import Label
  from '@component/Label'
import Spinner
  from '@component/Spinner'

const config = {
  maxSize: 5000000,
  maxRetention: 1
}



class UploaderComponent extends Component {
  constructor (...args) {
    super(...args)

    this.state = {
      valid: false,
      loading: false,
      status: null,

      // introduce broker logic later
      // brokerAlpha: true,
      // brokerBeta: true,
      retention: 1,

      metadata: null,
      upload: null,
      file: null
    }

    console.log(`Uploader.js:`, this)
  }

  // This is weird. Think about another way to do this
  // Also: 5mb exactly, what should happen?
  checkValidity (state) {
    state.valid = state.file && state.file.size <= config.maxSize && state.retention <= config.maxRetention // && state.brokerAlpha && state.brokerBeta

    return state
  }

  // changeBroker (e) {
  //   return new Promise((resolve, reject) => {
  //     this.setState(state => {
  //       // broker stuff here

  //       return this.checkValidity(state)
  //     }, _ => {
  //       resolve()
  //     })
  //   })
  // }

  changeRetention (input) {
    return new Promise((resolve, reject) => {
      this.setState(state => {
        state.retention = input
  
        return this.checkValidity(state)
      }, _ => {
        resolve()
      })
    })
  }

  changeFile (e) {
    return new Promise((resolve, reject) => {
      const el = e.target

      if (!el.files[0])
        this.setState({
          upload: null
        }, _ => { resolve() })
      else if (el.files[0] != this.state.file) {
        this.setState(state => {
          state.file = el.files[0]

          return this.checkValidity(state)
        }, _ => {
          this.changeUpload().then(resolve)
        })
      }
      else
        resolve()
    })
  }

  changeUpload () {
    return new Promise((resolve, reject) => {
      const upload = Oyster.Upload.fromFile(this.state.file)

      upload.on('finish', file => {
        console.log(file)

        this.props.history.push(`/file/${ file.handle }`)

        this.setState({
          loading: false,
          status: null
        })
      })

      upload.on('invoice', invoice => {
        console.warn(invoice)
        this.setState({
          status: 'Uploading File'
        })
      })

      upload.on('error', err => {
        this.showError(err)
        reject(err)
      })

      this.setState({
        upload: upload
      }, _ => {
        resolve()
      })
    })
  }

  startUpload () {
    return new Promise((resolve, reject) => {
      this.setState({
        loading: true,
        status: 'Getting Invoice'
      })

      if (this.state.upload)
        this.state.upload.uploadSession.then(this.state.upload.startUpload)
      else
        this.showError(new ReferenceError('no file to upload.'))
    })
  }

  handleDrop (e) {
    return new Promise((resolve, reject) => {
      // This is stupid. Clean it up
      const input = this.refs.filePicker.refs.fileInput
      
      input.files = e.dataTransfer.files
      // input doesn't automatically update. this forces the change
      input.dispatchEvent(new Event('input', {
        'bubbles': true,
        'cancelable': true
      }))

      resolve()
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
        <FileDropTarget className={ this.props.className }
          onDrop={ this.handleDrop.bind(this) }
        >
          <div>
            {/* Broker Node. Enable once fully ready */}
            {/* <FlexRow>
              <FlexColumn>
                <Label for="broker1">Broker Node 1:</Label>
                <ButtonSelect disabled id="broker1">
                  <option value="broker-1.oysternodes.com" selected>broker-1.oysternodes.com</option>
                </ButtonSelect>
              </FlexColumn>
              <FlexColumn>
                <Label for="broker2">Broker Node 2:</Label>
                <ButtonSelect disabled id="broker2">
                  <option value="broker-2.oysternodes.com" selected>broker-2.oysternodes.com</option>
                </ButtonSelect>
              </FlexColumn>
            </FlexRow> */}
            <Br size="small" />

            <Label for="retention">Retention Length:</Label>
            <FlexRow alignItems="center">
              <InputRange disabled id="retention"
                value={ this.state.retention } min="1" max="10"
                onInput={ e => this.changeRetention(e.target.value) } />
              <span>{ this.state.retention } Year{ this.state.retention == 1 ? '' : 's' }</span>
              <Cost
                file={ this.state.file }
                retention={ this.state.retention } />
              <Br size="small" />
              
            </FlexRow>
            <Br size="small" />

            <Label for="filepicker">Select a File:</Label>
            <FilePicker id="filepicker"
              ref={ el => this.refs.filePicker = el }
              onInput={ e => this.changeFile(e) } />
            { this.state.file && this.state.file.size >= config.maxSize && <span>File too large. Upload a file 5MB or smaller.</span> }
            <Br size="medium" />

            <Button redirects primary
              onClick={ e => this.startUpload() }
              disabled={ !this.state.valid || this.state.loading }
            >
              { this.state.loading && <Spinner size="small" /> }
              { this.state.status || 'Upload File' }
            </Button>
          </div>
        </FileDropTarget>
      </ThemeProvider>
    )
  }
}

const Uploader = styled(withRouter(UploaderComponent))``

export default Uploader