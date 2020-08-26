import { combineReducers } from "redux";

import boardReducer from "./board";
import boardsReducer from "./boards";
import postReducer from "./posts";
import repliesReducer from "./replies";

export default combineReducers({
  board: boardReducer,
  boards: boardsReducer,
  posts: postReducer,
  replies: repliesReducer,
});
