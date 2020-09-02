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
  const formData = new FormData();
  formData.append("image", image);

  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  await axios.post("/api/v1/test", formData, config);

  // await axios
  //   .post("/api/v1/posts", {
  //     image: image,
  //     comment: comment,
  //     board: board,
  //   })
  //   .then((res) => {
  //     dispatch({
  //       type: ADD_POST,
  //       payload: res.data,
  //     });
  //   });
};
