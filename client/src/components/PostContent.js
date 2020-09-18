import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { setReplyTarget } from "../store/actions/replyTarget";

import { Image, Transformation } from "cloudinary-react";
import Moment from "moment";

import ReplyForm from "./ReplyForm";

const PostContent = ({
  content,
  postID,
  replyID,
  replyType,
  replyTarget,
  setReplyTarget,
}) => {
  const handleReply = (e) => {
    setReplyTarget({ type: replyType, id: content.id });
  };

  const [imageID, setImageID] = useState("");

  useEffect(() => {
    console.log(content);
    if (content.image_link) {
      const imageLink = content.image_link;
      setImageID(imageLink.substring(imageLink.lastIndexOf("/") + 1));
    }
  }, [replyTarget]);

  const [isShowing, setIsShowing] = useState(true);

  const handleShowing = (e) => {
    setIsShowing(!isShowing);
  };

  Moment.locale("en");

  return (
    <div>
      <div style={{ display: "inline" }}>
        <button onClick={handleShowing.bind(this)}>
          {isShowing ? "-" : "+"}
        </button>
        <b>File</b>:{" "}
        <a href={content.image_link} target="_blank">
          {content.image_name}
        </a>
      </div>

      <div style={{ display: "block" }}>
        <div style={{ display: "inline" }}>
          {isShowing && content.image_link ? (
            <Image cloudName="dyvaitfrl" publicId={imageID}>
              <Transformation height="250" crop="scale" />
            </Image>
          ) : null}
        </div>
        <div style={{ display: "inline" }}>
          <b>{content.username}</b>
          &nbsp;
          {Moment(content.date).format("M/D/yyyy")}
          &nbsp;
          {isShowing ? (
            <button onClick={handleReply.bind(this)}>Reply</button>
          ) : null}
        </div>
        {isShowing ? content.comment : null}
        {replyTarget &&
        replyTarget.type === replyType &&
        replyTarget.id === content.id ? (
          <ReplyForm postID={postID} replyID={replyID} />
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  replyTarget: state.replyTarget,
});

export default connect(mapStateToProps, { setReplyTarget })(PostContent);
