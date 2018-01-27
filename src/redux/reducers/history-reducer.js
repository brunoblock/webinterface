import historyActions from "redux/actions/history-actions";

const initState = {
  uploadedFiles: [
    // { numberOfChunks: 10, fileName: "hello.txt", handle: "abc123", progress: 0 }
  ]
};

const uploadedFileGenerator = ({ numberOfChunks, fileName, handle }) => {
  return { numberOfChunks, fileName, handle, progress: 0 };
};

const historyReducer = (state = initState, action) => {
  switch (action.type) {
    case historyActions.ADD_UPLOADED_FILE:
      const { numberOfChunks, fileName, handle } = action.payload;
      return {
        ...state,
        uploadedFiles: [
          ...state.uploadedFiles,
          uploadedFileGenerator({ numberOfChunks, fileName, handle })
        ]
      };
    default:
      return state;
  }
};

export default historyReducer;
