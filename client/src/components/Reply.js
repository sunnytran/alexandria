import React from "react";
import { connect } from "react-redux";

import { setReplyTarget } from "../store/actions/replyTarget";

import ReplyForm from "./ReplyForm";

const Reply = ({ postID, replyContent, replyTarget, setReplyTarget }) => {
  const handleReply = (e) => {
    setReplyTarget({ type: "reply", id: replyContent.id });
  };

  return (
    <div style={{ paddingTop: "10px", paddingLeft: "20px" }}>
      <div style={{ display: "inline" }}>
        <b>{replyContent.username}</b>
        &nbsp;
        <button onClick={handleReply.bind(this)}>Reply</button>
      </div>
      <br />
      {replyContent.date}
      <br />
      {replyContent.comment}

      {replyTarget.type === "reply" && replyTarget.id === replyContent.id ? (
        <ReplyForm postID={postID} replyID={replyContent.id} />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  replyTarget: state.replyTarget,
});

export default connect(mapStateToProps, { setReplyTarget })(Reply);
