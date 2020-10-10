import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import PostContent from "../content/PostContent";
import Reply from "../reply/Reply";
import ReplyForm from "../reply/ReplyForm";

const Post = ({
  isPreviewing = false,
  postContent,
  allReplies,
  hasReplyForm = false,
  updateReplyTarget,
  replyTargetData,
  isMod
}) => {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    setReplies(
      allReplies.filter(
        (i) =>
          i.replying_to_post_id === postContent.id && !i.replying_to_reply_id
      )
    );
  }, [allReplies.length]);

  const [isShowing, setIsShowing] = useState(true);

  const handleShowing = (e) => {
    setIsShowing(!isShowing);
  };

  const previewNReplies = 3;
  var newReplies = replies;
  if (isPreviewing) newReplies = replies.slice(0, previewNReplies);

  var borderColor = 'white'
  if (postContent.status === 'locked')
  borderColor = 'purple-500'

  const isLocked = postContent.status === "locked";

  return (
    <div class="pb-10">
      <PostContent
        isPreviewing={isPreviewing}
        content={postContent}
        postID={postContent.id}
        updateReplyTarget={updateReplyTarget}
        handleShowing={handleShowing}
        isShowing={isShowing}
        isMod={isMod}
        borderColor={borderColor}
        isLocked={isLocked}
      />

      {replyTargetData &&
      replyTargetData.type === "post" &&
      replyTargetData.value === postContent.id ? (
        <ReplyForm
          board={postContent.board}
          postID={postContent.id}
          replyUsername={postContent.username}
          updateReplyTarget={updateReplyTarget}
        />
      ) : null}

      {isShowing ? (
        <div>
          {newReplies.map((i) => {
            return (
              <Reply
                key={i.id}
                isPreviewing={isPreviewing}
                postID={postContent.id}
                replyContent={i}
                allReplies={allReplies}
                hasReplyForm={hasReplyForm}
                updateReplyTarget={updateReplyTarget}
                replyTargetData={replyTargetData}
                isMod={isMod}
                borderColor={borderColor}
                isLocked={isLocked}
              />
            );
          })}
        </div>
      ) : null}

      {isShowing &&
      isPreviewing &&
      ((replies.length < previewNReplies &&
        allReplies.length >= previewNReplies) ||
        allReplies.length > previewNReplies) ? (
        <Link
          class="underline text-blue-500 hover:underline hover:text-white"
          to={"/" + postContent.board + "/" + postContent.id}
        >
          View more replies...
        </Link>
      ) : null}
    </div>
  );
};

export default Post;
