import React, { useState, useEffect } from "react";

import Reply from "./Reply";
import ReplyForm from "./ReplyForm";

const Post = ({ postContent, replyingTo, setReplyingTo, allReplies }) => {
  const handleReply = (e) => {
    setReplyingTo(postContent.id);
  };

  const [replies, setReplies] = useState([]);

  useEffect(() => {
    setReplies(allReplies.filter((i) => i.replying_to === postContent.id));
  });

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

export default Post;
