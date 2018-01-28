import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import _ from "lodash";

import downloadActions from "redux/actions/download-actions";
import { IOTA_API } from "config";
import Iota from "services/iota";
import Datamap from "utils/datamap";
import Encryption from "utils/encryption";

function beginDownload(action$, store) {
  return action$.ofType(downloadActions.BEGIN_DOWNLOAD).mergeMap(action => {
    const { handle, fileName, numberOfChunks } = action.payload;
    const datamap = Datamap.generate(handle, numberOfChunks);
    const addresses = _.values(datamap).map(trytes =>
      trytes.substr(0, IOTA_API.ADDRESS_LENGTH)
    );
    return Observable.fromPromise(Iota.findTransactions(addresses))
      .map(transactions => {
        console.log("IOTA TRANSACTIONS FOUND: ", transactions);
        transactions.slice(1, transactions.length).forEach(t => {
          const message = t.signatureMessageFragment;
          const evenChars =
            message.length % 2 === 0
              ? message
              : message.substr(0, message.length - 1);
          const data = Iota.utils.fromTrytes(evenChars);
          console.log("STILL ENCRYPTEDDDD: ", data);
          const decrypted = Encryption.decrypt(data, handle);
          console.log("DATAAAAAAAAA: ", decrypted);
        });
        return downloadActions.downloadSuccessAction();
      })
      .catch(error => downloadActions.downloadFailureAction(error));
  });
}

export default combineEpics(beginDownload);
