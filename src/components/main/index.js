import React, { Component } from "react";
import { connect } from "react-redux";

import uploadActions from "../../redux/actions/upload-actions";

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  initializeUploadFn: file =>
    dispatch(uploadActions.initializeUploadAction(file))
});

class Main extends Component {
  render() {
    const { initializeUploadFn } = this.props;
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
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
