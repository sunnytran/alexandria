var stringUtils = require("../utils/stringUtils");

const handlePostGet = (db) => async (req, res) => {
  var post = await db("posts").where({ id: req.params.id });
  res.json(post[0]);
};

const handlePostPost = (db, dataUri, uploader) => async (req, res) => {
  const fs = require("fs");

  data = {
    username: "Anonymous",
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

  var post = await db("posts")
    .insert(data)
    .returning("*")
    .then((res) => res);
  post = post[0];

  var name = stringUtils.generateName(req.ip, post.id);
  await db("posts").where({ id: post.id }).update({ username: name });
  post.username = name;

  res.json(post[0]);
};

module.exports = {
  handlePostGet: handlePostGet,
  handlePostPost: handlePostPost,
};
