import { SET_REPLY_TARGET } from "./types";

export const setReplyTarget = (replyTarget) => async (dispatch) => {
  dispatch({
    type: SET_REPLY_TARGET,
    payload: replyTarget,
  });
};
