import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { setReplyTarget } from "../store/actions/replyTarget";

import { Image, Transformation } from "cloudinary-react";
import Moment from "moment";

import ReplyForm from "./ReplyForm";

const Content = ({ content, replyType, replyTarget, setReplyTarget }) => {
  const handleReply = (e) => {
    setReplyTarget({ type: replyType, id: content.id });
  };

  const [imageID, setImageID] = useState("");

  useEffect(() => {
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
        {isShowing && content.image_link ? (
          <Image cloudName="dyvaitfrl" publicId={imageID}>
            <Transformation height="250" crop="scale" />
          </Image>
        ) : null}
        &nbsp;
        <b>{content.username}</b>
        &nbsp;
        {isShowing ? (
          <button onClick={handleReply.bind(this)}>Reply</button>
        ) : null}
      </div>
      <br />
      {Moment(content.date).format("M/D/yyyy")}
      <br />
      {isShowing ? content.comment : null}

      {replyTarget &&
      replyTarget.type === replyType &&
      replyTarget.id === content.id ? (
        <ReplyForm postID={content.id} />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  replyTarget: state.replyTarget,
});

export default connect(mapStateToProps, { setReplyTarget })(Content);
