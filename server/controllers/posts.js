const handlePostsGet = (db) => async (req, res) => {
  var posts = await db("posts").where({ board: req.params.id });

  res.json(posts);
};

module.exports = {
  handlePostsGet: handlePostsGet,
  // hanldePostsPost: hanldeRepliesPost,
};
