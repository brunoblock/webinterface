import React, { Component } from "react";
import { connect } from "react-redux";

import uploadActions from "../../redux/actions/upload-actions";
import downloadActions from "../../redux/actions/download-actions";

const mapStateToProps = state => ({
  uploadHistory: state.upload.history
});
const mapDispatchToProps = dispatch => ({
  beginDownloadFn: ({ fileName, handle, numberOfChunks }) =>
    dispatch(
      downloadActions.beginDownloadAction({ fileName, handle, numberOfChunks })
    ),
  initializeUploadFn: file =>
    dispatch(uploadActions.initializeUploadAction(file))
});

class Main extends Component {
  renderUploadRow(upload, downloadFileFn) {
    const { fileName, uploadProgress, handle, numberOfChunks } = upload;
    if (uploadProgress < 100) {
      return (
        <span key={handle}>
          {fileName}: UPLOAD PROGRESS: {uploadProgress}%
        </span>
      );
    } else {
      return (
        <span key={handle}>
          <button
            onClick={() => downloadFileFn({ fileName, handle, numberOfChunks })}
          >
            DOWNLOAD {fileName}
          </button>
        </span>
      );
    }
  }

  render() {
    const { initializeUploadFn, uploadHistory, beginDownloadFn } = this.props;
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
        <div>
          {uploadHistory.map(upload =>
            this.renderUploadRow(upload, beginDownloadFn)
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
