import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getPosts } from "../store/actions/posts";

import ContentBorder from "../components/ContentBorder";

const Stats = ({ posts, getPosts }) => {
  useEffect(() => {
    getPosts();
    console.log(posts);
  }, [posts.length, getPosts]);

  return (
    <ContentBorder title="Stats">
      <p># of Posts: {posts.length}</p>
      <p># of Images: {posts.filter((i) => i.image_link !== null).length}</p>
    </ContentBorder>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

export default connect(mapStateToProps, { getPosts })(Stats);
