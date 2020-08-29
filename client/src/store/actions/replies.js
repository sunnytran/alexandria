import axios from "axios";

import { GET_REPLIES, ADD_REPLY } from "./types";

export const getReplies = () => async (dispatch) => {
  await axios.get("/api/v1/replies/").then((res) => {
    dispatch({
      type: GET_REPLIES,
      payload: res.data,
    });
  });
};

export const addReply = (
  image,
  comment,
  board,
  replyingToPostID,
  replyingToReplyID
) => async (dispatch) => {
  await axios
    .post("/api/v1/replies", {
      image: image,
      comment: comment,
      board: board,
      replyingToPostID: replyingToPostID,
      replyingToReplyID: replyingToReplyID,
    })
    .then((res) => {
      dispatch({
        type: ADD_REPLY,
        payload: res.data,
      });
    });
};
