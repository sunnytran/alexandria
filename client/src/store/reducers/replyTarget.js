import { SET_REPLY_TARGET } from "../actions/types";

const replyTargetReducer = (state = [], { type, payload }) => {
  switch (type) {
    case SET_REPLY_TARGET:
      return payload;
    default:
      return state;
  }
};

export default replyTargetReducer;
