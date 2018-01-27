import fileActions from "redux/actions/file-actions";

const initState = {
  uploads: [
    // { numberOfChunks: 10, fileName: "hello.txt", handle: "abc123", progress: 0 }
  ]
};

const uploadedFileGenerator = ({ numberOfChunks, fileName, handle }) => {
  return { numberOfChunks, fileName, handle, progress: 0 };
};

const fileReducer = (state = initState, action) => {
  switch (action.type) {
    case fileActions.ADD_UPLOADED_FILE:
      const { numberOfChunks, fileName, handle } = action.payload;
      return {
        ...state,
        uploads: [
          ...state.uploads,
          uploadedFileGenerator({ numberOfChunks, fileName, handle })
        ]
      };
    default:
      return state;
  }
};

export default fileReducer;
