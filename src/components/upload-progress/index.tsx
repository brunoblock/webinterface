import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import UploadProgressSlide from "./upload-progress-slide";

const mapStateToProps = state => ({
  upload: state.upload
});
const mapDispatchToProps = dispatch => ({});

interface UploadProgressProps {
  upload: any;
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
