import React, { useState } from "react";
import ReplyForm from "./ReplyForm";

const Post = ({ postContent, replyingTo, setReplyingTo }) => {
  const handleReply = (e) => {
    setReplyingTo(postContent.id);
  };

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
      {replyingTo === postContent.id ? <ReplyForm /> : null}
    </div>
  );
};

export default Post;
