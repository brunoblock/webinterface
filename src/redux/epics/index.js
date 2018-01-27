import { combineEpics } from "redux-observable";

import uploadEpic from "redux/epics/upload-epic";
import fileEpic from "redux/epics/file-epic";

export default combineEpics(uploadEpic, fileEpic);
