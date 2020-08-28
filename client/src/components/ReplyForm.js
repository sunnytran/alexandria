import React, { useState } from "react";
import { connect } from "react-redux";
import { addReply } from "../store/actions/replies";

const ReplyForm = ({ board, addReply, setReplyingTo, postID }) => {
  const [image, setImage] = useState(null);

  const onChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddReply = (e) => {
    e.preventDefault();

    addReply(image, e.target.comment.value, board.name, postID, "post");

    e.target.image.value = "";
    e.target.comment.value = "";
    setImage(null);

    setReplyingTo(null);
  };

  return (
    <div style={{ paddingTop: "10px", paddingLeft: "20px" }}>
      <form onSubmit={handleAddReply.bind(this)}>
        <label>Image</label>
        <input type="file" name="image" onChange={onChange.bind(this)} />
        <br />
        <label>Comment</label>
        <br />
        <textarea name="comment" rows="5" cols="50" />
        <br />
        <input type="submit" value="Reply" />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  board: state.board,
});

export default connect(mapStateToProps, { addReply })(ReplyForm);
