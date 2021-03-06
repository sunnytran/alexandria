import axios from "axios";

import { GET_POSTS, ADD_POST } from "./types";

export const getPosts = (boardName) => async (dispatch) => {
  await axios.get("/api/v1/posts/" + boardName).then((res) => {
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  });
};

export const addPost = (image, title, comment, board, username) => async (
  dispatch
) => {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("title", title);
  formData.append("comment", comment);
  formData.append("board", board);
  formData.append("username", username);
  formData.append("is_author_mod", username !== "");

  await axios.post("/api/v1/post", formData).then((res) => {
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
  });
};
