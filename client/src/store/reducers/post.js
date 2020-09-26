import { GET_POST, ADD_POST } from "../actions/types";

const postReducer = (state = [], { type, payload }) => {
  switch (type) {
    case GET_POST:
      return payload;
    case ADD_POST:
      return state.concat(payload);
    default:
      return state;
  }
};

export default postReducer;
