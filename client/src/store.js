import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import allReducers from "./reducers";

export default createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(thunk))
);
