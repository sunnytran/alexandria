const handleRepliesGet = (db) => async (req, res) => {
  const replies = await db("replies").where(req.query);
  res.json(replies);
};

const handleRepliesPost = (db, dataUri, uploader) => async (req, res) => {
  data = {
    username: "Anonymous",
    date: new Date(),
    comment: req.body.comment,
    replying_to_post_id: req.body.replyingToPostID,
    board: req.body.board,
  };

  if (req.body.replyingToReplyID && req.body.replyingToReplyID !== undefined) {
    data.replying_to_reply_id = req.body.replyingToReplyID;
  }

  if (req.file) {
    const file = dataUri(req).content;
    await uploader.upload(file).then((result) => {
      data.image_link = result.url;
      data.image_name = req.file.originalname;
    });
  }

  const replies = await db("replies")
    .insert(data)
    .returning("*")
    .then((res) => res);

  res.json(replies[0]);
};

module.exports = {
  handleRepliesGet: handleRepliesGet,
  handleRepliesPost: handleRepliesPost,
};
