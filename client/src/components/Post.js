import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { setReplyTarget } from "../store/actions/replyTarget";

import Content from "./Content";
import Reply from "./Reply";

const Post = ({ postContent, replyTarget, setReplyTarget, allReplies }) => {
  const handleReply = (e) => {
    setReplyTarget({ type: "post", id: postContent.id });
  };

  const [imageID, setImageID] = useState("");
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const imageLink = postContent.image_link;
    setImageID(imageLink.substring(imageLink.lastIndexOf("/") + 1));

    setReplies(
      allReplies.filter(
        (i) =>
          i.replying_to_post_id === postContent.id && !i.replying_to_reply_id
      )
    );
  }, [allReplies.length, replyTarget]);

  const [isShowing, setIsShowing] = useState(true);

  const handleShowing = (e) => {
    setIsShowing(!isShowing);
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <Content
        content={postContent}
        replyType={"post"}
        replyTarget={replyTarget}
        setReplyTarget={setReplyTarget}
      />

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
