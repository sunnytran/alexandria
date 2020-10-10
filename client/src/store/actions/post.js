import axios from "axios";

import { GET_POST, UPDATE_POST } from "./types";

export const getPost = (id) => async (dispatch) => {
  await axios.get("/api/v1/post/" + id).then((res) => {
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  });
};

export const updatePost = (id, status) => async (dispatch) => {
  await axios.put("/api/v1/post/" + id, {status: status}).then((res) => {
    dispatch({
      type: UPDATE_POST,
      payload: res.data,
    });
  });
};
