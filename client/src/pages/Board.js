import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { getBoard } from "../store/actions/board";
import { getPosts, addPost } from "../store/actions/posts";

import Post from "../components/Post";
import PostForm from "../components/PostForm";

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

  const [replyingTo, setReplyingTo] = useState(null);

  useEffect(() => {
    getBoard(boardName);
    getPosts(boardName);
  }, [posts.length, getPosts]);

  return (
    <div>
      <h1>
        /{board.name}/ - {board.title}
      </h1>

      <PostForm />

      <div>
        {posts.map((i) => {
          return (
            <Post
              key={i.id}
              postContent={i}
              replyingTo={replyingTo}
              setReplyingTo={setReplyingTo}
            />
          );
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
