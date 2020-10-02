import React, { useState } from "react";
import { connect } from "react-redux";

import { addPost } from "../../store/actions/posts";

import { ToastContainer, toast } from "react-toastify";

import ContentBorder from "../content/ContentBorder";

const PostForm = ({ board, addPost }) => {
  const [image, setImage] = useState(null);

  const onChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddPost = (e) => {
    e.preventDefault();

    if (image && e.target.title.value) {
      // TODO: Check if comment is empty
      addPost(image, e.target.title.value, e.target.comment.value, board.name);

      e.target.title.value = "";
      e.target.image.value = "";
      e.target.comment.value = "";
      setImage(null);
    }

    // if (!image) {
    //   toast("You need to upload an image");
    // }
    // if (!e.target.title.value) toast("You need to have a title");
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
      />
      <div class="z-50 fixed bottom-0 right-0 bg-black pb-5 pr-5">
        <ContentBorder title="Make a post" borderColor="orange-300">
          <form onSubmit={handleAddPost.bind(this)}>
            <div class="flex space-x-2 mb-2">
              <label>Title</label>
              <input class="text-black" name="title" type="text" />
            </div>
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  board: state.board,
});

export default connect(mapStateToProps, { addPost })(PostForm);
