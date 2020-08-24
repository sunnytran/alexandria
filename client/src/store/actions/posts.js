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

export const addPost = (image, comment, board) => async (dispatch) => {
  let data = new FormData();
  data.append("image", image, image.fileName);
  console.log(data.get("image"));

  await axios
    .post("/api/v1/posts", {
      image: data,
      comment: comment,
      board: board,
    })
    .then((res) => {
      dispatch({
        type: ADD_POST,
        payload: res.data,
      });
    });
};
