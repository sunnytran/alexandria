import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getBoard } from "../store/actions/boards";

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

const Board = ({ match, location, board, getBoard }) => {
  const {
    params: { boardName },
  } = match;

  useEffect(() => {
    getBoard(boardName);

    console.log(board);
  });

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

const mapStateToProps = (state) => ({
  board: state.board,
});

export default connect(mapStateToProps, { getBoard })(Board);
