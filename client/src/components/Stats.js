import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getPosts } from "../store/actions/posts";

const Stats = ({ posts, getPosts }) => {
  useEffect(() => {
    getPosts();
    console.log(posts);
  }, [posts.length, getPosts]);

  return (
    <div>
      <p># of Posts: {posts.length}</p>
      <p># of Images: {posts.filter((i) => i.image_link !== null).length}</p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps, { getPosts })(Stats);
