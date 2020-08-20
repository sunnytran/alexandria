import axios from "axios";

import { GET_BOARD } from "./types";

export const getBoard = (name) => async (dispatch) => {
  await axios.get("/api/v1/board/" + name).then((res) => {
    dispatch({
      type: GET_BOARD,
      payload: res.data,
    });
  });
};
