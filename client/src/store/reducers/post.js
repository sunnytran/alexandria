import { GET_POST } from "../actions/types";

const postReducer = (state = [], { type, payload }) => {
  switch (type) {
    case GET_POST:
      return payload;
    default:
      return state;
  }
};

export default postReducer;
