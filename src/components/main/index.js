import React, { Component } from "react";
import { connect } from "react-redux";

import uploadActions from "../../redux/actions/upload-actions";
import downloadActions from "../../redux/actions/download-actions";

const mapStateToProps = state => ({
  uploadHistory: state.upload.history
});
const mapDispatchToProps = dispatch => ({
  beginDownloadFn: handle => dispatch(downloadActions.beginDownloadFn(handle)),
  initializeUploadFn: file =>
    dispatch(uploadActions.initializeUploadAction(file))
});

class Main extends Component {
  renderUploadRow(upload) {
    const { fileName, uploadProgress, handle } = upload;
    if (uploadProgress < 100) {
      return (
        <span key={handle}>
          {fileName}: UPLOAD PROGRESS: {uploadProgress}%
        </span>
      );
    } else {
      return (
        <span key={handle}>
          <button onClick={() => console.log("heyyyyyyyY")}>
            DOWNLOAD {fileName}
          </button>
        </span>
      );
    }
  }

  render() {
    const { initializeUploadFn, uploadHistory } = this.props;
    return (
      <div>
        <input
          ref="fileInput"
          type="file"
          onClick={event => {
            event.target.value = null;
          }}
        />
        <button
          onClick={() => {
            const file = this.refs.fileInput.files[0];
            initializeUploadFn(file);
          }}
        >
          Upload a file.
        </button>
        <div>{uploadHistory.map(upload => this.renderUploadRow(upload))}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
