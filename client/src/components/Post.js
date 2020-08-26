import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getReplies } from "../store/actions/replies";

import Reply from "./Reply";
import ReplyForm from "./ReplyForm";

const Post = ({
  postContent,
  replies,
  getReplies,
  replyingTo,
  setReplyingTo,
}) => {
  const handleReply = (e) => {
    setReplyingTo(postContent.id);
  };

  useEffect(() => {
    getReplies(postContent.id);
    console.log(replies);
  }, [replies.length, getReplies]);

  return (
    <div style={{ marginBottom: "10px" }}>
      <div>
        <div style={{ display: "inline" }}>
          <b>{postContent.username}</b>
          &nbsp;
          <button onClick={handleReply.bind(this)}>Reply</button>
        </div>
        <br />
        {postContent.date}
        <br />
        {postContent.comment}
      </div>

      <div>
        {replies.map((i) => {
          return <Reply key={i.id} replyContent={i} />;
        })}
      </div>

      {replyingTo === postContent.id ? (
        <ReplyForm setReplyingTo={setReplyingTo} postID={postContent.id} />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  replies: state.replies,
});

export default connect(mapStateToProps, { getReplies })(Post);
