import axios from "axios";

import { GET_REPLIES, ADD_REPLY } from "./types";

export const getReplies = (params) => async (dispatch) => {
  await axios.get("/api/v1/replies/", { params: params }).then((res) => {
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
  replyingToReplyID, username
) => async (dispatch) => {
  const formData = new FormData();
  if (image) formData.append("image", image);
  formData.append("comment", comment);
  formData.append("board", board);
  formData.append("username", username);
  formData.append("replyingToPostID", replyingToPostID);
  formData.append("is_author_mod", username !== "")
  if (replyingToReplyID)
    formData.append("replyingToReplyID", replyingToReplyID);

  await axios.post("/api/v1/replies", formData).then((res) => {
    dispatch({
      type: ADD_REPLY,
      payload: res.data,
    });
  });
};
