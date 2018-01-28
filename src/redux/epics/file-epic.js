import { Observable } from "rxjs";
import { combineEpics } from "redux-observable";
import _ from "lodash";

import downloadActions from "redux/actions/download-actions";
import { IOTA_API } from "config";
import Iota from "services/iota";
import Datamap from "utils/datamap";

function beginDownload(action$, store) {
  return action$.ofType(downloadActions.BEGIN_DOWNLOAD).map(action => {
    const { handle, fileName, numberOfChunks } = action.payload;
    const datamap = Datamap.generate(handle, numberOfChunks);
    const addresses = _.values(datamap).map(trytes =>
      trytes.substr(0, IOTA_API.ADDRESS_LENGTH)
    );
    console.log("POLLING 81 CHARACTER IOTA ADDRESSES: ", addresses);
    return Observable.fromPromise(Iota.findTransactions(addresses))
      .map(transactions =>
        
      )
      .catch(error => Observable.empty())

  });
}

export default combineEpics(beginDownload);
