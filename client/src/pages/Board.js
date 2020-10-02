import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getBoard } from "../store/actions/board";
import { getPosts } from "../store/actions/posts";
import { getReplies } from "../store/actions/replies";

import Post from "../components/post/Post";
import PostForm from "../components/post/PostForm";
import BoardsNav from "../components/BoardsNav";

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
    getReplies({ board: boardName });
  }, [posts.length, getPosts, replies.length, getReplies]);

  return (
    <div class="h-screen bg-gradient-to-b from-gray-900 to-black text-white font-mono text-sm">
      <div class="pt-5 pb-2">
        <h1 class="font-serif font-semibold text-2xl text-center">
          /{board.name}/ - {board.title}
        </h1>
        <BoardsNav />
      </div>

      <PostForm />

      <div class="pt-5 pl-5 pb-5">
        {posts.map((i) => {
          return i.board === boardName ? (
            <Post
              key={i.id}
              isPreviewing={true}
              postContent={i}
              allReplies={replies.filter(
                (j) =>
                  j.replying_to_post_id === i.id ||
                  j.replying_to_reply_id === i.id
              )}
            />
          ) : null;
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

export default connect(mapStateToProps, {
  getBoard,
  getPosts,
  getReplies,
})(Board);
