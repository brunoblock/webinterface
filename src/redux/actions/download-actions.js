const BEGIN_DOWNLOAD = "oyster/upload/begin_download";

const ACTIONS = Object.freeze({
  // actions
  BEGIN_DOWNLOAD,

  // actionCreators
  beginDownloadAction: ({ fileName, handle, numberOfChunks }) => ({
    type: ACTIONS.BEGIN_DOWNLOAD,
    payload: { fileName, handle, numberOfChunks }
  })
});

export default ACTIONS;
