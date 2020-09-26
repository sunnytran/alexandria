const handlePostGet = (db) => async (req, res) => {
  var post = await db("posts").where({ id: req.params.id });
  res.json(post[0]);
};

const handlePostPost = (db, dataUri, uploader) => async (req, res) => {
  data = {
    username: "Anonymous",
    date: new Date(),
    title: req.body.title,
    comment: req.body.comment,
    board: req.body.board,
  };

  if (req.file) {
    const file = dataUri(req).content;
    await uploader.upload(file).then((result) => {
      data.image_link = result.url;
      data.image_name = req.file.originalname;
    });
  }

  const post = await db("posts")
    .insert(data)
    .returning("*")
    .then((res) => res);
  res.json(post[0]);
};

module.exports = {
  handlePostGet: handlePostGet,
  handlePostPost: handlePostPost,
};