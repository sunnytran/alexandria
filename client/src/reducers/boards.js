import { GET_BOARDS } from "../actions/types";

const initialState = {
  boards: [],
};

const boards = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOARDS:
      return action.payload;
    default:
      return state;
  }
};

export default boards;
