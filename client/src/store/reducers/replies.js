import { GET_REPLIES, ADD_REPLY } from "../actions/types";

const repliesReducer = (state = [], { type, payload }) => {
  switch (type) {
    case GET_REPLIES:
      return payload;
    case ADD_REPLY:
      return state.concat(payload);
    default:
      return state;
  }
};

export default repliesReducer;
