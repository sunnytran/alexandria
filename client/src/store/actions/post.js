import axios from "axios";

import { GET_POST, ADD_POST } from "./types";

export const getPost = (id) => async (dispatch) => {
  await axios.get("/api/v1/post/" + id).then((res) => {
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  });
};

export const addPost = (image, title, comment, board) => async (dispatch) => {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("title", title);
  formData.append("comment", comment);
  formData.append("board", board);

  await axios.post("/api/v1/post", formData).then((res) => {
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
  });
};
