import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getBoard } from "../store/actions/board";
import { getPost } from "../store/actions/post";
import { getReplies } from "../store/actions/replies";

import Post from "../components/Post";
import ReplyForm from "../components/ReplyForm";

const PostPage = ({
  match,
  location,
  board,
  getBoard,
  post,
  getPost,
  replies,
  getReplies,
}) => {
  const {
    params: { boardName, postID },
  } = match;

  useEffect(() => {
    getBoard(boardName);
    getPost(postID);
    getReplies({ replying_to_post_id: postID });

    // console.log(postID);
    // console.log(post);
    // console.log("=========");
  }, [getPost, replies.length, getReplies]);

  return (
    <div class="h-screen bg-gradient-to-b from-gray-900 to-black text-white font-mono">
      <div class="pt-5">
        <h1 class="font-serif font-semibold text-2xl text-center">
          /{board.name}/ - {board.title}
        </h1>
      </div>

      <div class="pt-5 pl-5 pb-5">
        {post.length !== 0 ? (
          <Post postContent={post} allReplies={replies} />
        ) : null}
      </div>

      <ReplyForm />
    </div>
  );
};

const mapStateToProps = (state) => ({
  board: state.board,
  post: state.post,
  replies: state.replies,
});

export default connect(mapStateToProps, { getBoard, getPost, getReplies })(
  PostPage
);
