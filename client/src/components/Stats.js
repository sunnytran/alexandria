import React, { useEffect, useState } from "react";

import ContentBorder from "./content/ContentBorder";

import axios from "axios";

const Stats = () => {
  const [nPosts, setNPosts] = useState(0);
  const [nImages, setNImages] = useState(0);

  useEffect(() => {
    axios.get("/api/v1/stats").then((res) => {
      setNPosts(res.data.n_posts);
      setNImages(res.data.n_images);
    });
  }, [nPosts, nImages]);

  return (
    <ContentBorder title="Stats">
      <p># of Posts: {nPosts}</p>
      <p># of Images: {nImages}</p>
    </ContentBorder>
  );
};

export default Stats;
