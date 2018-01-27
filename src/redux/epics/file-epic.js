import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import _ from "lodash";

import uploadActions from "redux/actions/upload-actions";
import fileActions from "redux/actions/file-actions";

function saveToUploads(action$, store) {
  return action$.ofType(uploadActions.BEGIN_UPLOAD).map(action => {
    const { numberOfChunks, handle, fileName } = action.payload;
    return fileActions.addUploadedFileAction({
      numberOfChunks,
      handle,
      fileName
    });
  });
}

export default combineEpics(saveToUploads);
