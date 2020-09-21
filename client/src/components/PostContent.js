import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { setReplyTarget } from "../store/actions/replyTarget";

import { Image, Transformation } from "cloudinary-react";

import ContentBorder from "./ContentBorder";
import PostTitle from "./PostTitle";
import ReplyForm from "./ReplyForm";

const PostContent = ({
  content,
  postID,
  replyID,
  replyType,
  replyTarget,
  setReplyTarget,
  handleShowing,
  isShowing,
}) => {
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

  return (
    <div class="flex">
      <div class="w-1/3">
        <ContentBorder
          title={
            <PostTitle
              title={content.title}
              date={content.date}
              handleShowing={handleShowing}
              isShowing={isShowing}
            />
          }
        >
          <div class="flex space-x-2">
            <div class="w-1/3">
              {isShowing && content.image_link ? (
                <a href={content.image_link} target="_blank">
                  <Image cloudName="dyvaitfrl" publicId={imageID}>
                    <Transformation height="250" crop="scale" />
                  </Image>
                </a>
              ) : null}
            </div>
            <div class="w-1/2">
              {isShowing ? content.comment : null}
              {isShowing ? (
                <div class="flex space-x-1">
                  <div>{content.username}</div>
                  <div>
                    <button onClick={handleReply.bind(this)}>
                      <p class="underline text-blue-500 hover:underline hover:text-white">
                        [Reply]
                      </p>
                    </button>
                  </div>
                </div>
              ) : null}

              {replyTarget &&
              replyTarget.type === replyType &&
              replyTarget.id === content.id ? (
                <ReplyForm postID={postID} replyID={replyID} />
              ) : null}
            </div>
          </div>
        </ContentBorder>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  replyTarget: state.replyTarget,
});

export default connect(mapStateToProps, { setReplyTarget })(PostContent);
