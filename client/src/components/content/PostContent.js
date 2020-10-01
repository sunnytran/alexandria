import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Image, Transformation } from "cloudinary-react";

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

  const contentLength = content.comment.length;

  var size = "1/3";
  if (contentLength > 1000) size = "1/2";

  var height = "200";
  if (contentLength > 1000) height = "300";

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
              <div class="h-auto">{isShowing ? content.comment : null}</div>
              {isShowing ? (
                <div>
                  <div class="flex h-8"></div>
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
                </div>
              ) : null}
            </div>
          </div>
        </ContentBorder>
      </div>
    </div>
  );
};

export default PostContent;

{
  /* <div class="flex justify-end h-4">
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
</div>  */
}