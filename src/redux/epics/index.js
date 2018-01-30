import { combineEpics } from "redux-observable";

import uploadEpic from "redux/epics/upload-epic";
import downloadEpic from "redux/epics/download-epic";
import downloadUploadHistoryEpic from "redux/epics/download-upload-history-epic";

export default combineEpics(uploadEpic, downloadEpic, downloadUploadHistoryEpic);