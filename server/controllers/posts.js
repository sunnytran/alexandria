const handlePostsGet = (db) => async (req, res) => {
  var posts = await db("posts").where({ board: req.params.id });

  res.json(posts);
};

const handlePostsPost = (db, dataUri, uploader) => async (req, res) => {
  var finalImg = null;

  if (req.file) {
    const file = dataUri(req).content;
    return uploader.upload(file).then((result) => {
      const image = result.url;
      console.log(image);
    });
  }

  data = {
    username: "Anonymous",
    date: new Date(),
    comment: req.body.comment,
    board: req.body.board,
    // image: finalImg,
  };
  const post = await db("posts")
    .insert(data)
    .returning("*")
    .then((res) => res);
  res.json(post[0]);
};

module.exports = {
  handlePostsGet: handlePostsGet,
  handlePostsPost: handlePostsPost,
};
