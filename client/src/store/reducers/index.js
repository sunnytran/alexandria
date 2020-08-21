import { combineReducers } from "redux";

import boardReducer from "./board";
import boardsReducer from "./boards";
import postReducer from "./posts";

export default combineReducers({
  board: boardReducer,
  boards: boardsReducer,
  post: postReducer,
});
