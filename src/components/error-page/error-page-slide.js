import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import SlideError from "components/shared/slide-error";
import ICON_ERROR from "assets/images/icon_error.png";

const ErrorPageSlide = ({ handle }) => (
<SlideError title="Uh oh! Something went wong." image={null} >
    <img src={ICON_ERROR} className="error-img" alt="error-img" />
    <p className="error-description">
    There was a problem with your upload. Please <a className="error-description__link" href="#"> contect support </a> about your issue.
</p>



    </SlideError>
);

export default ErrorPageSlide;
