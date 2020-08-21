import axios from "axios";

import { ADD_POST } from "./types";

export const addPost = (textComment, boardName) => async (dispatch) => {
  await axios
    .post("/api/v1/post", { comment: textComment, board: boardName })
    .then((res) => {
      dispatch({
        type: ADD_POST,
        payload: res.data,
      });
    });
};
