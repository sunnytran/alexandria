import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { setReplyTarget } from "../store/actions/replyTarget";

import Moment from "moment";

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

  const [isShowing, setIsShowing] = useState(true);

  const handleShowing = (e) => {
    setIsShowing(!isShowing);
  };

  Moment.locale("en");

  return (
    <div style={{ paddingTop: "10px", paddingLeft: "20px" }}>
      <div style={{ display: "inline" }}>
        <button onClick={handleShowing.bind(this)}>
          {isShowing ? "-" : "+"}
        </button>
        <img
          src={
            isShowing && replyContent.image_link ? replyContent.image_link : ""
          }
        />
        &nbsp;
        <b>{replyContent.username}</b>
        &nbsp;
        {isShowing ? (
          <button onClick={handleReply.bind(this)}>Reply</button>
        ) : null}
      </div>
      <br />
      {Moment(replyContent.date).format("M/D/yyyy")}
      <br />
      {isShowing ? replyContent.comment : null}

      {replyTarget &&
      replyTarget.type === "reply" &&
      replyTarget.id === replyContent.id ? (
        <ReplyForm postID={postID} replyID={replyContent.id} />
      ) : null}

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
