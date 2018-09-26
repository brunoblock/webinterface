import React from "react";

import ProgressBar from "../shared/progress-bar";
import Slide from "../shared/slide";
import Spinner from "../shared/spinner";

const ICON_UPLOAD = require("../../assets/images/icon_upload.png");

const UploadStartedSlide = ({ chunksProgress }) => (
  <Slide title="Upload Started" image={ICON_UPLOAD}>
    <p className="transaction-confirmed-instructions">
      File is being broken into chunks and each chunk encrypted.
      <Spinner isActive={chunksProgress === 0} className="download-spinner" />
    </p>
    <p className="transaction-confirmed-instructions">
      Please do not leave this tab or close your browser.
    </p>
    <div>
      <ProgressBar progress={chunksProgress} />
      <strong>{Math.floor(Math.min(100, chunksProgress))}%</strong>
    </div>
  </Slide>
);

export default UploadStartedSlide;
