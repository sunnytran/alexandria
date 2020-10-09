import axios from "axios";

import { GET_USER_DATA } from "./types";

export const getUserData = () => async (dispatch) => {
  // alert(localStorage.getItem("token"));
  await axios
    .get("/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((res) => {
      dispatch({
        type: GET_USER_DATA,
        payload: res.data,
      });
    });
};
