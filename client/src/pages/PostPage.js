import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getBoard } from "../store/actions/board";
import { getPosts } from "../store/actions/posts";
import { getReplies } from "../store/actions/replies";

import Post from "../components/Post";

const PostPage = ({
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
    params: { boardName, postID },
  } = match;

  useEffect(() => {
    getBoard(boardName);
    getPosts(boardName);
    getReplies({ replying_to_post_id: postID });
    console.log(replies);
  }, [posts.length, getPosts, replies.length, getReplies]);

  return (
    <div class="h-screen bg-gradient-to-b from-gray-900 to-black text-white font-mono">
      <div class="pt-5">
        <h1 class="font-serif font-semibold text-2xl text-center">
          /{board.name}/ - {board.title}
        </h1>
      </div>

      {/* <Post postContent={i} allReplies={replies /> */}
      {/* <div class="pt-5 pl-5 pb-5">
        {posts.map((i) => {
          return <Post key={i.id} postContent={i} allReplies={replies} />;
        })}
      </div> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  board: state.board,
  posts: state.posts,
  replies: state.replies,
});

export default connect(mapStateToProps, { getBoard, getPosts, getReplies })(
  PostPage
);
