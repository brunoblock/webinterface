import { Observable } from "rxjs";

import Backend from "../../services/backend";

export const execObservableIfBackendAvailable = (hosts, obsFn) =>
  Observable.fromPromise(Backend.checkStatus(hosts))
    .filter((available: any) => available)
    .mergeMap(obsFn);
