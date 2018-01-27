import { combineEpics } from "redux-observable";

import uploadEpic from "redux/epics/upload-epic";

export default combineEpics(uploadEpic);
