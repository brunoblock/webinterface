import React, { Component } from "react";
import { connect } from "react-redux";

import FileSaver from "file-saver";

import downloadUploadHistoryActions from "../../redux/actions/download-upload-history-actions";

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  beginDownloadUploadHistoryFn: () =>
    dispatch(downloadUploadHistoryActions.beginDownloadUploadHistoryAction())
});

class DownloadUploadHistoryButton extends Component {
  render() {
    const { beginDownloadUploadHistoryFn } = this.props;
    return (
      <div>
        <button
          onClick={() => {
            beginDownloadUploadHistoryFn();
          }}
        >
          Download upload history
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadUploadHistoryButton);