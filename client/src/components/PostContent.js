import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { setReplyTarget } from "../store/actions/replyTarget";

import { Image, Transformation } from "cloudinary-react";
import Moment from "moment";

import ContentBorder from "./ContentBorder";
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
    <ContentBorder title={content.image_name}>
      <div class="flex space-x-2">
        <div class="w-1/3">
          <div class="flex space-x-2">
            <div>
              <button onClick={handleShowing.bind(this)}>
                {isShowing ? "-" : "+"}
              </button>
            </div>
            <div>{content.username}</div>
            <div>{Moment(content.date).format("M/D/yyyy")}</div>
          </div>
          <a
            class="underline text-blue-500 hover:underline hover:text-white"
            href={content.image_link}
            target="_blank"
          >
            {content.image_name}
          </a>
          {isShowing && content.image_link ? (
            <Image cloudName="dyvaitfrl" publicId={imageID}>
              <Transformation height="250" crop="scale" />
            </Image>
          ) : null}
        </div>
        <div class="w-1/2">
          {isShowing ? content.comment : null}
          {isShowing ? (
            <button onClick={handleReply.bind(this)}>Reply</button>
          ) : null}
          {replyTarget &&
          replyTarget.type === replyType &&
          replyTarget.id === content.id ? (
            <ReplyForm postID={postID} replyID={replyID} />
          ) : null}
        </div>
      </div>
    </ContentBorder>
  );
};

const mapStateToProps = (state) => ({
  replyTarget: state.replyTarget,
});

export default connect(mapStateToProps, { setReplyTarget })(PostContent);
