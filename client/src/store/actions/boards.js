import { GET_BOARD, GET_BOARDS } from "./types";

import axios from "axios";

export const getBoard = (name) => async (dispatch) => {
  await axios.get("/api/v1/board/" + name).then((res) => {
    console.log(res.data);
    dispatch({
      type: GET_BOARD,
      payload: res.data,
    });
  });
};

export const getBoards = () => async (dispatch) => {
  await axios.get("/api/v1/boards").then((res) => {
    dispatch({
      type: GET_BOARDS,
      payload: res.data,
    });
  });
};
