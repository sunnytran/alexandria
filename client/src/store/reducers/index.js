import { combineReducers } from "redux";

import boardReducer from "./board";
import boardsReducer from "./boards";

export default combineReducers({
  board: boardReducer,
  boards: boardsReducer,
});
