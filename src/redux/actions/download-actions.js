const BEGIN_DOWNLOAD = "oyster/upload/begin_download";

const ACTIONS = Object.freeze({
  // actions
  BEGIN_DOWNLOAD,

  // actionCreators
  beginDownloadAction: handle => ({
    type: ACTIONS.BEGIN_DOWNLOAD,
    payload: handle
  })
});

export default ACTIONS;
