import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { setReplyTarget } from "../store/actions/replyTarget";

import ReplyForm from "./ReplyForm";

const Reply = ({
  postID,
  replyContent,
  allReplies,
  replyTarget,
  setReplyTarget,
}) => {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    setReplies(
      allReplies.filter(
        (i) =>
          i.replying_to_post_id === postID &&
          i.replying_to_reply_id === replyContent.id
      )
    );
  }, [allReplies.length, replyTarget]);

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

      {replyTarget &&
      replyTarget.type === "reply" &&
      replyTarget.id === replyContent.id ? (
        <ReplyForm postID={postID} replyID={replyContent.id} />
      ) : null}

      <div>
        {replies.map((i) => {
          return (
            <Reply
              key={i.id}
              postID={postID}
              replyContent={i}
              allReplies={allReplies}
            />
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  replyTarget: state.replyTarget,
});

export default connect(mapStateToProps, { setReplyTarget })(Reply);
