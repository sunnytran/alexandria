import { GET_REPLIES, ADD_REPLY, UPDATE_REPLY } from "../actions/types";

const repliesReducer = (state = [], { type, payload }) => {
  switch (type) {
    case GET_REPLIES:
      return payload;
    case ADD_REPLY:
      return state.concat(payload);
    case UPDATE_REPLY:
        console.log(state);
        return state;
    default:
      return state;
  }
};

export default repliesReducer;
