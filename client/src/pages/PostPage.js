import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { getBoard } from "../store/actions/board";
import { getPost } from "../store/actions/post";
import { getReplies } from "../store/actions/replies";
import { getUserData } from "../store/actions/user";

import Post from "../components/post/Post";
import BoardsNav from "../components/BoardsNav";

const PostPage = ({
  match,
  location,
  board,
  getBoard,
  post,
  getPost,
  replies,
  getReplies,
  user,
  getUserData
}) => {
  const {
    params: { boardName, postID },
  } = match;

  const [replyTargetData, setReplyTargetData] = useState(null);

  useEffect(() => {
    getBoard(boardName);
    getPost(postID);
    getReplies({ replying_to_post_id: postID });
    if (user.username === undefined) getUserData();
  }, [post.id, getPost, replies.length, getReplies, user, getUserData]);

  const updateReplyTarget = (targetData) => {
    setReplyTargetData(targetData);
  };

  return (
    <div class="h-screen bg-gradient-to-b from-gray-900 to-black text-white font-mono text-sm">
      <div class="pt-5">
        <h1 class="font-serif font-semibold text-2xl text-center">
          /{board.name}/ - {board.title}
        </h1>
        <BoardsNav />
      </div>
      <div class="pt-5 pl-5 pb-5">
        {post.length !== 0 && post.id == postID ? (
          <Post
            preview={false}
            postContent={post}
            allReplies={replies}
            updateReplyTarget={updateReplyTarget}
            replyTargetData={replyTargetData}
            isMod={user.role === "mod"}
          />
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  board: state.board,
  post: state.post,
  replies: state.replies,
  user: state.user
});

export default connect(mapStateToProps, { getBoard, getPost, getReplies, getUserData })(
  PostPage
);
