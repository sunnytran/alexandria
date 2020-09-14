import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { setReplyTarget } from "../store/actions/replyTarget";

import Content from "./Content";

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

  const [isShowing, setIsShowing] = useState(true);

  const handleShowing = (e) => {
    setIsShowing(!isShowing);
  };

  return (
    <div style={{ paddingTop: "10px", paddingLeft: "20px" }}>
      <Content
        content={replyContent}
        replyType={"reply"}
        replyTarget={replyTarget}
        setReplyTarget={setReplyTarget}
      />

      {isShowing ? (
        <div>
          {replies.map((i) => {
            return (
              <ConnectedReply
                key={i.id}
                postID={postID}
                replyContent={i}
                allReplies={allReplies}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  replyTarget: state.replyTarget,
});

const ConnectedReply = connect(mapStateToProps, { setReplyTarget })(Reply);

export default ConnectedReply;
