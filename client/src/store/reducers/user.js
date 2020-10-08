import { GET_USER_DATA } from "../actions/types";

const userReducer = (state = [], { type, payload }) => {
  switch (type) {
    case GET_USER_DATA:
      return payload;
    default:
      return state;
  }
};

export default userReducer;
