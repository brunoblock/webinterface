import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import UploadProgressSlide from "./upload-progress-slide";
import { getSortedHistoryDesc } from "../../redux/selectors/upload-history-selector";
import uploadActions from "../../redux/actions/upload-actions";

const mapStateToProps = state => ({
  upload: state.upload,
  uploadHistory: state.upload.history,
  historyDesc: getSortedHistoryDesc(state)
});
const mapDispatchToProps = dispatch => ({
  streamUploadProgressFn: progress =>
    dispatch(uploadActions.streamUploadProgress({ progress })),
  streamUploadSuccessFn: handle =>
    dispatch(uploadActions.streamUploadSuccess({ handle }))
});

interface UploadProgressProps {
  upload: any;
  uploadHistory: any;
  historyDesc: any[];
  location: any;
  streamUploadProgressFn: any;
  streamUploadSuccessFn: any;
}

interface UploadProgressState {}

class UploadProgress extends React.Component<
  UploadProgressProps,
  UploadProgressState
> {
  render() {
    const { upload } = this.props;
    const uploadProgress = upload.uploadProgress;

    return <UploadProgressSlide uploadProgress={uploadProgress} />;
  }
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UploadProgress)
);
