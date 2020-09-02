import React, { useState } from "react";
import { connect } from "react-redux";
import { addPost } from "../store/actions/posts";

const PostForm = ({ board, addPost }) => {
  const [image, setImage] = useState(null);

  const onChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddPost = (e) => {
    e.preventDefault();

    // TODO: Check if comment is empty
    addPost(image, e.target.comment.value, board.name);

    e.target.image.value = "";
    e.target.comment.value = "";
    setImage(null);
  };

  return (
    <div>
      <form onSubmit={handleAddPost.bind(this)} enctype="multipart/form-data">
        <label>Image</label>
        <input type="file" name="image" onChange={onChange.bind(this)} />
        <br />
        <label>Comment</label>
        <br />
        <textarea name="comment" rows="5" cols="50" />
        <br />
        <input type="submit" value="Post" />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  board: state.board,
});

export default connect(mapStateToProps, { addPost })(PostForm);
