import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import UploadStartedSlide from "components/upload-started/upload-started-slide";
import { getSortedHistoryDesc } from "redux/selectors/upload-history-selector";
import { FEAT_FLAG } from "config";

const mapStateToProps = state => ({
  history: state.upload.history,
  historyDesc: getSortedHistoryDesc(state)
});
const mapDispatchToProps = dispatch => ({});

const UploadStarted = ({ history, historyDesc }) => {
  const uploadedFile = FEAT_FLAG.STREAMING_FILE
    ? historyDesc[0]
    : _.last(history);
  const uploadProgress = uploadedFile ? uploadedFile.uploadProgress : 0;
  return <UploadStartedSlide uploadProgress={uploadProgress} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadStarted);
