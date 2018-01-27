const INITIALIZE_UPLOAD = "oyster/file/initialize_upload";
const BEGIN_UPLOAD = "oyster/file/begin_upload";
const UPLOAD = "oyster/file/upload";
const UPLOAD_SUCCESS = "oyster/file/upload_success";
const UPLOAD_FAILURE = "oyster/file/upload_failure";
const UPDATE_UPLOAD_PROGRESS = "oyster/file/update_upload_progress";
const MARK_UPLOAD_AS_COMPLETE = "oyster/file/mark_upload_as_complete";

const ACTIONS = Object.freeze({
  // actions
  INITIALIZE_UPLOAD,
  BEGIN_UPLOAD,
  UPLOAD,
  UPLOAD_SUCCESS,
  UPLOAD_FAILURE,
  UPDATE_UPLOAD_PROGRESS,
  MARK_UPLOAD_AS_COMPLETE,

  // actionCreators
  initializeUploadAction: file => ({
    type: ACTIONS.INITIALIZE_UPLOAD,
    payload: file
  }),
  beginUploadAction: ({ file, handle, fileName, numberOfChunks }) => ({
    type: ACTIONS.BEGIN_UPLOAD,
    payload: { file, handle, fileName, numberOfChunks }
  }),
  uploadAction: ({ file, handle }) => ({
    type: ACTIONS.UPLOAD,
    payload: { file, handle }
  }),
  uploadSuccessAction: ({ numberOfChunks, handle, fileName }) => ({
    type: ACTIONS.UPLOAD_SUCCESS,
    payload: { numberOfChunks, handle, fileName }
  }),
  uploadFailureAction: error => ({
    type: ACTIONS.UPLOAD_FAILURE,
    payload: error
  }),
  updateUploadProgress: percentage => ({
    type: ACTIONS.UPDATE_UPLOAD_PROGRESS,
    payload: percentage
  }),
  markUploadAsComplete: () => ({ type: ACTIONS.MARK_UPLOAD_AS_COMPLETE })
});

export default ACTIONS;
