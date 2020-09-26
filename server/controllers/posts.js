const handlePostsGet = (db) => async (req, res) => {
  var posts = await db("posts").where({ board: req.params.id });
  if (req.params.id === "undefined") posts = await db("posts");

  res.json(posts);
};

module.exports = {
  handlePostsGet: handlePostsGet,
};
