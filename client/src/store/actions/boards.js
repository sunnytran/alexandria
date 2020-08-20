import { GET_BOARDS } from "./types";

import axios from "axios";

export const getBoards = () => async (dispatch) => {
  const res = await axios.get("/api/v1/boards").then((res) => {
    dispatch({
      type: GET_BOARDS,
      payload: res.data,
    });
  });
};
