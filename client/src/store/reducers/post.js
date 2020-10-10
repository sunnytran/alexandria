import { GET_POST, UPDATE_POST } from "../actions/types";

const postReducer = (state = [], { type, payload }) => {
  switch (type) {
    case GET_POST:
      return payload;
    case UPDATE_POST:
      return state;
    default:
      return state;
  }
};

export default postReducer;
