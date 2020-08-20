import { GET_BOARD } from "../actions/types";

const boardReducer = (state = [], { type, payload }) => {
  switch (type) {
    case GET_BOARD:
      return payload;
    default:
      return state;
  }
};

export default boardReducer;
