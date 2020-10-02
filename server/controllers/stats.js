const handleStatsGet = (db) => async (req, res) => {
  const nPosts = await db("posts").count("id");
  const nImages = await db("replies").count("image_link");

  res.json({
    n_posts: parseInt(nPosts[0].count),
    n_images: parseInt(nPosts[0].count) + parseInt(nImages[0].count),
  });
};

module.exports = {
  handleStatsGet: handleStatsGet,
};
