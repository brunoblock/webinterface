import historyActions from "redux/actions/upload-history-actions";

const initState = {
  uploadedFiles: [
    // { numberOfChunks: 10, fileName: "hello.txt", fileHandle: "abc123" }
  ]
};

const uploadedFileGenerator = ({ numberOfChunks, fileName, fileHandle }) => {
  return { numberOfChunks, fileName, fileHandle };
};

const historyReducer = (state = initState, action) => {
  switch (action.type) {
    case historyActions.ADD_UPLOADED_FILE:
      const { numberOfChunks, fileName, fileHandle } = action.payload;
      return {
        ...state,
        uploadedFiles: [
          ...state.uploadedFiles,
          uploadedFileGenerator({ numberOfChunks, fileName, fileHandle })
        ]
      };
    default:
      return state;
  }
};

export default historyReducer;
