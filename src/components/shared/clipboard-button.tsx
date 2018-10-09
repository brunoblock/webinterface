import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ClipboardBtn = ({ text, children }) => (
  <CopyToClipboard text={text}>
    <button className="clipboard-button">{children}</button>
  </CopyToClipboard>
);

export default ClipboardBtn;
