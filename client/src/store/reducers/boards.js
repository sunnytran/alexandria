import { GET_BOARDS } from "../actions/types";

const boardsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case GET_BOARDS:
      return payload;
    default:
      return state;
  }
};

export default boardsReducer;
