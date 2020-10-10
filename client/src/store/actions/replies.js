import axios from "axios";

import { GET_REPLIES, ADD_REPLY, UPDATE_REPLY } from "./types";

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

export const updateReply = (id, status) => async (dispatch) => {
  await axios.put("/api/v1/replies/", { status: status, id: id }).then((res) => {
    dispatch({
      type: UPDATE_REPLY,
      payload: res.data,
    });
  });
};
