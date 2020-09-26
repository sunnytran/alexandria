import { GET_POSTS, ADD_POST } from "../actions/types";

const postsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case GET_POSTS:
      return payload;
    case ADD_POST:
      return state.concat(payload);
    default:
      return state;
  }
};

export default postsReducer;
