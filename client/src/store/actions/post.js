import axios from "axios";

import { GET_POST } from "./types";

export const getPost = (id) => async (dispatch) => {
  await axios.get("/api/v1/post/" + id).then((res) => {
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  });
};
