import Stream from "oyster-streamable";

/**
 *
 * @param {File} file
 * @param {Object} config { alpha, beta }
 * @param {Object} handlers { invoiceCb, doneCb, errCb }
 */
export const streamUpload = (
  file,
  { alpha, beta, retentionYears },
  {
    invoiceCb,
    paymentPendingCb,
    paymentConfirmedCb,
    uploadProgressCb,
    doneCb,
    errCb
  }
) => {
  const u = Stream.Upload.fromFile(file, {
    alpha,
    beta,
    epochs: retentionYears
  });

  u.on("invoice", invoiceCb);
  u.on("payment-pending", paymentPendingCb);
  u.on("payment-confirmed", paymentConfirmedCb);
  u.on("upload-progress", uploadProgressCb);
  u.on("finish", doneCb);
  u.on("error", errCb);
};
