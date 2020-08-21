import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getBoard } from "../store/actions/board";
import { getPosts, addPost } from "../store/actions/posts";

import Post from "../components/Post";

const Board = ({
  match,
  location,
  board,
  getBoard,
  posts,
  getPosts,
  addPost,
}) => {
  const {
    params: { boardName },
  } = match;

  useEffect(() => {
    getBoard(boardName);
    getPosts(board.name);
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

      <div>
        {posts.map((i) => {
          return <Post key={i.id} postContent={i} />;
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  board: state.board,
  posts: state.posts,
});

export default connect(mapStateToProps, { getBoard, getPosts, addPost })(Board);
