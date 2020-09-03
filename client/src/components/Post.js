import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { setReplyTarget } from "../store/actions/replyTarget";

import Moment from "moment";

import Reply from "./Reply";
import ReplyForm from "./ReplyForm";

const Post = ({ postContent, replyTarget, setReplyTarget, allReplies }) => {
  const handleReply = (e) => {
    setReplyTarget({ type: "post", id: postContent.id });
  };

  const [replies, setReplies] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    setReplies(
      allReplies.filter(
        (i) =>
          i.replying_to_post_id === postContent.id && !i.replying_to_reply_id
      )
    );

    if (postContent.image) {
      setImage(Buffer.from(postContent.image.data).toString("base64"));
      console.log(postContent.image.data);
    }
  }, [allReplies.length, replyTarget]);

  const [isShowing, setIsShowing] = useState(true);

  const handleShowing = (e) => {
    setIsShowing(!isShowing);
  };

  Moment.locale("en");

  return (
    <div style={{ marginBottom: "10px" }}>
      <div>
        <div style={{ display: "inline" }}>
          <button onClick={handleShowing.bind(this)}>
            {isShowing ? "-" : "+"}
          </button>
          &nbsp;
          <b>{postContent.username}</b>
          &nbsp;
          {isShowing ? (
            <button onClick={handleReply.bind(this)}>Reply</button>
          ) : null}
        </div>
        <br />
        {Moment(postContent.date).format("M/D/yyyy")}
        <br />
        {isShowing ? postContent.comment : null}
      </div>

      {replyTarget &&
      replyTarget.type === "post" &&
      replyTarget.id === postContent.id ? (
        <ReplyForm postID={postContent.id} />
      ) : null}

      {isShowing ? (
        <div>
          {replies.map((i) => {
            return (
              <Reply
                key={i.id}
                postID={postContent.id}
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

export default connect(mapStateToProps, { setReplyTarget })(Post);
