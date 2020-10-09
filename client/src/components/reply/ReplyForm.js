import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { addReply } from "../../store/actions/replies";
import { getUserData } from "../../store/actions/user";

import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ReplyTitle from "./ReplyTitle";
import ContentBorder from "../content/ContentBorder";

const ReplyForm = ({
  board,
  addReply,
  postID,
  replyID,
  username,
  updateReplyTarget,
  user,
  getUserData,
}) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (user.username === undefined) getUserData();
  }, [user, getUserData]);

  const onChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddReply = (e) => {
    e.preventDefault();

    if (user.role === "guest") {
      toast("You are a guest and are not allowed to reply");

      e.target.image.value = "";
      e.target.comment.value = "";

      return;
    }

    if (
      image ||
      (e.target.comment.value && e.target.comment.value.length <= 2000)
    ) {
      addReply(image, e.target.comment.value, board.name, postID, replyID);

      e.target.image.value = "";
      e.target.comment.value = "";
      setImage(null);

      updateReplyTarget(null);
    } else if (e.target.comment.value && e.target.comment.value.length > 2000)
      toast("Your comment is too long (2000 characters max)");
    else {
      toast("You either need to have an image or a comment");
    }
  };

  return (
    <div class="flex">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable={false}
        transition={Slide}
        toastClassName="dark-toast"
      />
      <div class="w-1/3">
        <div class="flex pt-2 pl-4">
          <ContentBorder
            title={
              <ReplyTitle
                title={username}
                updateReplyTarget={updateReplyTarget}
              />
            }
            borderColor="orange-300"
          >
            <form onSubmit={handleAddReply.bind(this)}>
              <div class="flex space-x-2 mb-2">
                <label>Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/x-png,image/gif,image/jpeg"
                  onChange={onChange.bind(this)}
                />
              </div>
              <label>Comment</label>
              <textarea
                name="comment"
                class="form-textarea block text-black mb-2"
                rows="5"
                cols="50"
              />
              <input
                class="bg-white hover:bg-gray-200 text-black px-2 focus:outline-none"
                type="submit"
                value="Reply"
              />
            </form>
          </ContentBorder>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  board: state.board,
  user: state.user,
});

export default connect(mapStateToProps, { addReply, getUserData })(ReplyForm);
