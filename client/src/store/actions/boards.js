import axios from "axios";

import { GET_BOARDS } from "./types";

export const getBoards = () => async (dispatch) => {
  await axios.get("/api/v1/boards/").then((res) => {
    dispatch({
      type: GET_BOARDS,
      payload: res.data,
    });
  });
};
