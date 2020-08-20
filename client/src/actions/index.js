import { GET_BOARDS } from "./types";

export const getBoards = () => async (dispatch) => {
  const res = axios.get("/api/v1/boards").data;

  dispatch({
    type: GET_BOARDS,
    payload: {
      boards: res.data,
    },
  });
};
