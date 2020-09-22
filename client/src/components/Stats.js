import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getPosts } from "../store/actions/posts";
import { getReplies } from "../store/actions/replies";

import ContentBorder from "../components/ContentBorder";

const Stats = ({ posts, getPosts, replies, getReplies }) => {
  useEffect(() => {
    getPosts();
    getReplies();
  }, [posts.length, getPosts, replies.length, getReplies]);

  var nImages = 0;
  nImages += posts.length;
  nImages += replies.filter((i) => i.image_link !== null).length;

  return (
    <ContentBorder title="Stats">
      <p># of Posts: {posts.length}</p>
      <p># of Images: {nImages}</p>
    </ContentBorder>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  replies: state.replies,
});

export default connect(mapStateToProps, { getPosts, getReplies })(Stats);
