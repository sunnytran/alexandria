import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { setReplyTarget } from "../store/actions/replyTarget";

import Reply from "./Reply";
import ReplyForm from "./ReplyForm";

const Post = ({ postContent, replyTarget, setReplyTarget, allReplies }) => {
  const handleReply = (e) => {
    setReplyTarget({ type: "post", id: postContent.id });
  };

  const [replies, setReplies] = useState([]);

  useEffect(() => {
    console.log(replyTarget);
    setReplies(
      allReplies.filter((i) => i.replying_to_post_id === postContent.id)
    );
  }, [allReplies.length, replyTarget]);

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

      {replyTarget.type === "post" && replyTarget.id === postContent.id ? (
        <ReplyForm postID={postContent.id} />
      ) : null}

      <div>
        {replies.map((i) => {
          return <Reply key={i.id} postID={postContent.id} replyContent={i} />;
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  replyTarget: state.replyTarget,
});

export default connect(mapStateToProps, { setReplyTarget })(Post);
