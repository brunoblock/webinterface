import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import _ from "lodash";

import fileActions from "redux/actions/file-actions";

import Iota from "services/iota";
import Datamap from "utils/datamap";
import FileProcessor from "utils/file-processor";

function uploadFile(action$, store) {
  return action$.ofType(fileActions.UPLOAD).mergeMap(action => {
    const file = action.payload;
    return Observable.fromPromise(FileProcessor.uploadFileToBrokerNodes(file))
      .map(({ numberOfChunks, handle }) =>
        fileActions.uploadSuccessAction({ numberOfChunks, handle })
      )
      .catch(error => {
        console.log("ERROR: ", error);
        return fileActions.uploadFailureAction;
      });
  });
}

function checkUploadProgress(action$, store) {
  return action$.ofType(fileActions.UPLOAD_SUCCESS).switchMap(action => {
    const { numberOfChunks, handle } = action.payload;
    const datamap = Datamap.generate(numberOfChunks, handle);
    const addresses = _.values(datamap);

    return Observable.interval(2000)
      .takeUntil(action$.ofType(fileActions.MARK_AS_COMPLETE))
      .mergeMap(action =>
        Observable.fromPromise(Iota.checkUploadPercentage(addresses)).map(
          percentage => fileActions.updateUploadProgress(percentage)
        )
      );
  });
}

function markDownloadAsComplete(action$, store) {
  return action$
    .ofType(fileActions.UPDATE_PROGRESS)
    .filter(action => {
      const percentage = action.payload;
      return percentage >= 100;
    })
    .map(() => fileActions.markDownloadAsComplete());
}

export default combineEpics(
  uploadFile,
  checkUploadProgress,
  markDownloadAsComplete
);
