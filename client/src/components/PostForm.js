import React, { useState } from "react";
import { connect } from "react-redux";
import { addPost } from "../store/actions/post";

import ContentBorder from "../components/ContentBorder";

const PostForm = ({ board, addPost }) => {
  const [image, setImage] = useState(null);

  const onChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddPost = (e) => {
    e.preventDefault();

    // TODO: Check if comment is empty
    addPost(image, e.target.title.value, e.target.comment.value, board.name);

    e.target.title.value = "";
    e.target.image.value = "";
    e.target.comment.value = "";
    setImage(null);
  };

  return (
    <div class="fixed bottom-0 right-0 pb-5 pr-5">
      <ContentBorder title="Make a post" borderColor="orange-300">
        <form onSubmit={handleAddPost.bind(this)}>
          <div class="flex space-x-2 mb-2">
            <label>Title</label>
            <input class="text-black" name="title" type="text" />
          </div>
          <div class="flex space-x-2 mb-2">
            <label>Image</label>
            <input type="file" name="image" onChange={onChange.bind(this)} />
          </div>
          <label>Comment</label>
          <textarea
            name="comment"
            class="text-black block mb-2"
            rows="5"
            cols="50"
          />
          <input
            class="bg-white hover:bg-gray-100 text-black px-2 focus:outline-none"
            type="submit"
            value="Post"
          />
        </form>
      </ContentBorder>
    </div>
  );
};

const mapStateToProps = (state) => ({
  board: state.board,
});

export default connect(mapStateToProps, { addPost })(PostForm);
