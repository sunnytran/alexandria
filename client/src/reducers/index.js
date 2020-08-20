import { combineReducers } from "redux";
import boards from "./boards";

const allReducers = combineReducers({
  boards,
});

export default allReducers;
