import React, { Component } from "react";
import { connect } from "react-redux";

import uploadActions from "../../redux/actions/upload-actions";

const mapStateToProps = state => ({
  uploads: state.file.uploads
});
const mapDispatchToProps = dispatch => ({
  initializeUploadFn: file =>
    dispatch(uploadActions.initializeUploadAction(file))
});

class Main extends Component {
  renderUploadRow(upload) {
    const { fileName, progress, handle } = upload;
    return (
      <span key={handle}>
        {fileName}: UPLOAD PROGRESS: {progress}
      </span>
    );
  }

  render() {
    const { initializeUploadFn, uploads } = this.props;
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
        <div>{uploads.map(upload => this.renderUploadRow(upload))}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
