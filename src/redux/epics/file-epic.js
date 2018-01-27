import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import _ from "lodash";

import fileActions from "redux/actions/file-actions";

import { IOTA_API } from "config";
import Iota from "services/iota";
import Datamap from "utils/datamap";
import FileProcessor from "utils/file-processor";

function initializeUpload(action$, store) {
  return action$.ofType(fileActions.INITIALIZE_UPLOAD).map(action => {
    const file = action.payload;
    const { numberOfChunks, handle, fileName } = FileProcessor.initializeUpload(
      file
    );
    return fileActions.beginUploadAction({
      numberOfChunks,
      handle,
      fileName,
      file
    });
  });
}

function uploadFile(action$, store) {
  return action$.ofType(fileActions.BEGIN_UPLOAD).mergeMap(action => {
    const { file, handle } = action.payload;
    return Observable.fromPromise(
      FileProcessor.uploadFileToBrokerNodes(file, handle)
    )
      .map(({ numberOfChunks, handle, fileName }) =>
        fileActions.uploadSuccessAction({ numberOfChunks, handle, fileName })
      )
      .catch(error => {
        console.log("UPLOAD FILE EPIC ERROR: ", error);
        return fileActions.uploadFailureAction;
      });
  });
}

function checkUploadProgress(action$, store) {
  return action$.ofType(fileActions.UPLOAD_SUCCESS).switchMap(action => {
    const { numberOfChunks, handle } = action.payload;
    const datamap = Datamap.generate(handle, numberOfChunks);
    const addresses = _.values(datamap).map(trytes =>
      trytes.substr(0, IOTA_API.ADDRESS_LENGTH)
    );
    console.log("POLLING 81 CHARACTER IOTA ADDRESSES: ", addresses);

    return Observable.interval(2000)
      .takeUntil(action$.ofType(fileActions.MARK_UPLOAD_AS_COMPLETE))
      .mergeMap(action =>
        Observable.fromPromise(Iota.checkUploadPercentage(addresses))
          .map(percentage => fileActions.updateUploadProgress(percentage))
          .catch(error => Observable.empty())
      );
  });
}

function markUploadAsComplete(action$, store) {
  return action$
    .ofType(fileActions.UPDATE_UPLOAD_PROGRESS)
    .filter(action => {
      const percentage = action.payload;
      return percentage >= 100;
    })
    .map(() => fileActions.markUploadAsComplete());
}

export default combineEpics(
  initializeUpload,
  uploadFile,
  checkUploadProgress,
  markUploadAsComplete
);
