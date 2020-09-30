import React, { useState } from "react";
import { connect } from "react-redux";

import { addReply } from "../../store/actions/replies";

import ReplyTitle from "./ReplyTitle";
import ContentBorder from "../content/ContentBorder";

const ReplyForm = ({
  board,
  addReply,
  postID,
  replyID,
  username,
  updateReplyTarget,
}) => {
  const [image, setImage] = useState(null);

  const onChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddReply = (e) => {
    e.preventDefault();

    addReply(image, e.target.comment.value, board.name, postID, replyID);

    e.target.image.value = "";
    e.target.comment.value = "";
    setImage(null);

    updateReplyTarget(null);
  };

  return (
    <div class="flex">
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
                class="bg-white hover:bg-gray-100 text-black px-2 focus:outline-none"
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
});

export default connect(mapStateToProps, { addReply })(ReplyForm);
