const handlePostsGet = (db) => async (req, res) => {
  var posts = await db("posts")
    .where({ board: req.params.id })
    .orderBy("last_bump", "desc");
  if (req.params.id === "undefined")
    posts = await db("posts").orderBy("last_bump", "desc");

  res.json(posts);
};

module.exports = {
  handlePostsGet: handlePostsGet,
};
