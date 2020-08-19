import React, { useState, useEffect } from "react";
import axios from "axios";

const postComment = (e) => {
  e.preventDefault();
  console.log(e.target.comment.value);

  // axios
  //   .post("/user", {
  //     firstName: "Fred",
  //     lastName: "Flintstone",
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
};

const Board = ({ match, location }) => {
  const {
    params: { boardName },
  } = match;

  return (
    <div>
      <h1>/{boardName}/</h1>

      <form onSubmit={postComment.bind(this)}>
        <label>Comment</label>
        <br />
        <textarea name="comment" rows="5" cols="50" />
        <br />
        <input type="submit" value="Post" />
      </form>
    </div>
  );
};

export default Board;
