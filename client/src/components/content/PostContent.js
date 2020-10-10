import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { updatePost } from "../../store/actions/post";

import { Image, Transformation } from "cloudinary-react";

import Linkify from "react-linkify";

import ContentBorder from "./ContentBorder";
import PostTitle from "../post/PostTitle";

const PostContent = ({
  isPreviewing = false,
  content,
  postID,
  replyID,
  updateReplyTarget,
  handleShowing,
  isShowing,
  isMod,
  updatePost,
  borderColor,
  isLocked
}) => {
  const [imageID, setImageID] = useState("");

  useEffect(() => {
    if (content.image_link) {
      const imageLink = content.image_link;
      setImageID(imageLink.substring(imageLink.lastIndexOf("/") + 1));
    }
  });

  const handleReply = () => {
    const type = replyID ? "reply" : "post";
    const value = type === "post" ? postID : replyID;

    updateReplyTarget({ type: type, value: value });
  };

  const handleLock = () => {
    updatePost(content.id, 'locked')
  };

  const contentLength = content.comment.length;

  var size = "2/5";
  if (contentLength > 1000) size = "1/2";

  var height = "200";
  if (contentLength > 1000) height = "300";

  const linkStyle = (href, text, key) => (
    <a
      class="underline text-blue-500 hover:underline hover:text-white"
      href={href}
      key={key}
      target="_blank"
    >
      {text}
    </a>
  );

  return (
    <div class="flex">
      <div class={"w-" + size}>
        <ContentBorder
          borderColor={borderColor}
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
                <a
                  href={content.image_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image cloudName="dyvaitfrl" publicId={imageID}>
                    <Transformation height={height} crop="scale" />
                  </Image>
                </a>
              ) : null}
            </div>
            <div class="relative w-full">
              <div class="h-auto">
                {isShowing ? (
                  <Linkify componentDecorator={linkStyle}>
                    {content.comment}
                  </Linkify>
                ) : null}
              </div>
              {isShowing ? (
                <div>
                  <div class="flex h-8"></div>
                  <div class="absolute right-0 bottom-0">
                    <div class="flex space-x-1">
                      <div><span class={content.is_author_mod ? "font-bold text-indigo-600" : ""}>{content.username}</span></div>
                      <div>
                        {isPreviewing ? (
                          <Link
                            class="underline text-blue-500 hover:underline hover:text-white"
                            to={"/" + content.board + "/" + postID}
                          >
                            {isLocked ? "[LOCKED]" : "[Reply]"}
                          </Link>
                        ) : (
                          <button onClick={isLocked ? null : handleReply.bind(this)}>
                            <p class="underline text-blue-500 hover:underline hover:text-white">
                            {isLocked ? "[LOCKED]" : "[Reply]"}
                            </p>
                          </button>
                        )}
                        { isMod ? (
                          <button onClick={handleReply.bind(this)}>
                            <p class="underline text-green-500 hover:underline hover:text-white">
                              [Sticky]
                            </p>
                          </button> ) : null}
                        { isMod ? (
                          <button onClick={handleLock.bind(this)}>
                            <p class="underline text-purple-500 hover:underline hover:text-white">
                              [Lock]
                            </p>
                          </button> ) : null}
                        { isMod ? (
                          <button onClick={handleReply.bind(this)}>
                            <p class="underline text-red-500 hover:underline hover:text-white">
                              [Delete]
                            </p>
                          </button> ) : null}
                      </div>
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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {updatePost})(PostContent);
