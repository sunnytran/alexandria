import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { setReplyTarget } from "../store/actions/replyTarget";

import { Image, Transformation } from "cloudinary-react";

import ContentBorder from "./ContentBorder";
import PostTitle from "./PostTitle";
import ReplyForm from "./ReplyForm";

const PostContent = ({
  isPreviewing = false,
  content,
  postID,
  replyID,
  replyType,
  replyTarget,
  setReplyTarget,
  updateReplyTarget,
  handleShowing,
  isShowing,
}) => {
  const [imageID, setImageID] = useState("");

  useEffect(() => {
    if (content.image_link) {
      const imageLink = content.image_link;
      setImageID(imageLink.substring(imageLink.lastIndexOf("/") + 1));
    }
  }, [replyTarget]);

  var size = "1/3";
  const contentLength = content.comment.length;
  if (contentLength > 1000) size = "1/2";

  const handleReply = () => {
    const type = replyID ? "reply" : "post";
    const value = type === "post" ? postID : replyID;

    updateReplyTarget({ type: type, value: value });
  };

  return (
    <div class="flex">
      <div class={"w-" + size}>
        <ContentBorder
          title={
            <PostTitle
              title={content.title}
              date={content.date}
              handleShowing={handleShowing}
              isShowing={isShowing}
              id={postID}
              board={content.board}
            />
          }
        >
          <div class="flex space-x-2">
            <div class="w-auto">
              {isShowing && content.image_link ? (
                <a href={content.image_link} target="_blank">
                  <Image cloudName="dyvaitfrl" publicId={imageID}>
                    <Transformation height="200" crop="scale" />
                  </Image>
                </a>
              ) : null}
            </div>
            <div class="relative w-full">
              <div>{isShowing ? content.comment : null}</div>
              {isShowing ? (
                <div class="absolute right-0 bottom-0">
                  <div class="flex space-x-1">
                    <div>{content.username}</div>
                    <div>
                      {isPreviewing ? (
                        <Link
                          class="underline text-blue-500 hover:underline hover:text-white"
                          to={"/" + content.board + "/" + postID}
                        >
                          [Reply]
                        </Link>
                      ) : (
                        <button onClick={handleReply.bind(this)}>
                          <p class="underline text-blue-500 hover:underline hover:text-white">
                            [Reply]
                          </p>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
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
