import { GET_POSTS } from "../actions/types";

const postsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case GET_POSTS:
      return payload;
    default:
      return state;
  }
};

export default postsReducer;
