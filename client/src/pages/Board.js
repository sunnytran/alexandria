import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { getBoard } from "../store/actions/board";
import { getPosts } from "../store/actions/posts";
import { getReplies } from "../store/actions/replies";

import Post from "../components/Post";
import PostForm from "../components/PostForm";

const Board = ({
  match,
  location,
  board,
  getBoard,
  posts,
  getPosts,
  replies,
  getReplies,
}) => {
  const {
    params: { boardName },
  } = match;

  useEffect(() => {
    getBoard(boardName);
    getPosts(boardName);
    getReplies();
  }, [posts.length, getPosts, replies.length, getReplies]);

  return (
    <div>
      <h1>
        /{board.name}/ - {board.title}
      </h1>

      <PostForm />

      <div>
        {posts.map((i) => {
          return <Post key={i.id} postContent={i} allReplies={replies} />;
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  board: state.board,
  posts: state.posts,
  replies: state.replies,
});

export default connect(mapStateToProps, { getBoard, getPosts, getReplies })(
  Board
);
