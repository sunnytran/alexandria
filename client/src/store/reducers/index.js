import { combineReducers } from "redux";

import boardReducer from "./board";
import boardsReducer from "./boards";
import postReducer from "./post";
import postsReducer from "./posts";
import repliesReducer from "./replies";

export default combineReducers({
  board: boardReducer,
  boards: boardsReducer,
  post: postReducer,
  posts: postsReducer,
  replies: repliesReducer,
});
