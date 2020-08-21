import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getBoard } from "../store/actions/board";
import { addPost } from "../store/actions/post";

const Board = ({ match, location, board, getBoard, addPost }) => {
  const {
    params: { boardName },
  } = match;

  useEffect(() => {
    getBoard(boardName);
  });

  const handleAddPost = (e) => {
    e.preventDefault();

    // TODO: Check if comment is empty
    addPost(e.target.comment.value, board.name);

    e.target.comment.value = "";
  };

  return (
    <div>
      <h1>
        /{board.name}/ - {board.title}
      </h1>

      <form onSubmit={handleAddPost.bind(this)}>
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

export default connect(mapStateToProps, { getBoard, addPost })(Board);
