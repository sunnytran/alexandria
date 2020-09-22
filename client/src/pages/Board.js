import React, { useEffect } from "react";
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
    <div class="bg-gradient-to-b from-gray-900 to-black text-white font-mono">
      <div class="pt-5">
        <h1 class="font-serif font-semibold text-2xl text-center">
          /{board.name}/ - {board.title}
        </h1>
      </div>

      <PostForm />

      <div class="pl-5 pb-5">
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
