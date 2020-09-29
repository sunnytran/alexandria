import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { setReplyTarget } from "../store/actions/replyTarget";

import PostContent from "./PostContent";
import ReplyForm from "../components/ReplyForm";

const Reply = ({
  isPreviewing = false,
  postID,
  replyContent,
  allReplies,
  replyTarget,
  setReplyTarget,
  hasReplyForm = false,
  updateReplyTarget,
  replyTargetData,
}) => {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    setReplies(
      allReplies.filter(
        (i) =>
          i.replying_to_post_id === postID &&
          i.replying_to_reply_id === replyContent.id
      )
    );
  }, [allReplies.length, replyTarget]);

  const [isShowing, setIsShowing] = useState(true);

  const handleShowing = (e) => {
    setIsShowing(!isShowing);
  };

  return (
    <div class="pt-2 pl-4">
      <PostContent
        isPreviewing={isPreviewing}
        content={replyContent}
        postID={postID}
        replyID={replyContent.id}
        replyType={"reply"}
        replyTarget={replyTarget}
        setReplyTarget={setReplyTarget}
        handleShowing={handleShowing}
        isShowing={isShowing}
        updateReplyTarget={updateReplyTarget}
        replyTargetData={replyTargetData}
      />

      {replyTargetData &&
      replyTargetData.type === "reply" &&
      replyTargetData.value === replyContent.id ? (
        <ReplyForm username={replyContent.username} />
      ) : null}

      {isShowing && !isPreviewing ? (
        <div>
          {replies.map((i) => {
            return (
              <ConnectedReply
                key={i.id}
                isPreviewing={isPreviewing}
                postID={postID}
                replyContent={i}
                allReplies={allReplies}
                hasReplyForm={hasReplyForm}
                updateReplyTarget={updateReplyTarget}
                replyTargetData={replyTargetData}
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

const ConnectedReply = connect(mapStateToProps, { setReplyTarget })(Reply);

export default ConnectedReply;
