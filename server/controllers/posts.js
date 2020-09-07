const handlePostsGet = (db) => async (req, res) => {
  var posts = await db("posts").where({ board: req.params.id });

  res.json(posts);
};

const handlePostsPost = (db, fs) => async (req, res) => {
  var finalImg = null;

  if (req.file.path) {
    var img = fs.readFileSync(req.file.path);
    var encoded = img.toString("base64");
    var finalImg = {
      contentType: req.file.mimetype,
      image: Buffer.from(encoded, "base64"),
    };
  }

  data = {
    username: "Anonymous",
    date: new Date(),
    comment: req.body.comment,
    board: req.body.board,
    image: finalImg,
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
