const ADD_UPLOADED_FILE = "oyster/file/add_uploaded_file";

const ACTIONS = Object.freeze({
  // actions
  ADD_UPLOADED_FILE,

  // actionCreators
  addUploadedFileAction: ({ numberOfChunks, fileName, fileHandle }) => ({
    type: ACTIONS.ADD_UPLOADED_FILE,
    payload: { numberOfChunks, fileName, fileHandle }
  })
});

export default ACTIONS;
