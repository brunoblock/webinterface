import React from "react";

import PrimaryButton from "components/shared/primary-button";
import ICON_TANGLE_LEFT from "assets/images/icon_tangle_left.png";
import ICON_TANGLE_RIGHT from "assets/images/icon_tangle_right.png";
import ICON_UPLOAD from "assets/images/icon_upload.png";
import ICON_DOWNLOAD from "assets/images/icon_download.png";

const ChoiceSlide = ({ visitUploadFormFn, visitDownloadFormFn }) => (
  <section className="slide">
    <div className="container choice-wrapper">
      <div className="choice-section">
        <img src={ICON_TANGLE_LEFT} className="tangle-image" alt="tangle" />
        <div>
          <img src={ICON_UPLOAD} className="upload-image" alt="upload" />
        </div>
        <div>
          <PrimaryButton id="upload-btn" onClick={visitUploadFormFn}>
            Upload a File
          </PrimaryButton>
        </div>
        <p className="instructions">Use Oyster to host a file on the Tangle.</p>
      </div>
      <div className="choice-section">
        <img src={ICON_TANGLE_RIGHT} className="tangle-image" alt="tangle" />
        <div>
          <img src={ICON_DOWNLOAD} className="upload-image" alt="download" />
        </div>
        <div>
          <PrimaryButton id="download-btn" onClick={visitDownloadFormFn}>
            Retrieve a File
          </PrimaryButton>
        </div>
        <p className="instructions">
          Use an Oyster handle to retrieve a file from the Tangle.
        </p>
      </div>
    </div>
  </section>
);

export default ChoiceSlide;
