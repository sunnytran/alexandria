import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getPosts } from "../store/actions/posts";

const Stats = ({ posts, getPosts }) => {
  useEffect(() => {
    getPosts();
    console.log(posts);
  }, [posts.length, getPosts]);

  return <div>Total posts: {posts.length}</div>;
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps, { getPosts })(Stats);
