import React from "react";

const Post = ({ postContent }) => {
  console.log(postContent);

  return (
    <div style={{ marginBottom: "10px" }}>
      <b>{postContent.username}</b>
      <br />
      {postContent.date}
      <br />
      {postContent.comment}
    </div>
  );
};

export default Post;
