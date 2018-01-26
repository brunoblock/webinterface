import { combineReducers } from "redux";

import file from "redux/reducers/file-reducer";
import localStorage from "redux/reducers/localStorage-reducer";

export default combineReducers({ file, localStorage });
